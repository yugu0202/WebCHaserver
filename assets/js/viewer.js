if (window.is_view)
{
    enchant();

    var nexted_flag = false;
    var preved_flag = false;
    var play_flag = false;
    var playrev_flag = false;
    var last_flag = false;
    var first_flag = false;
    var right_count = 0;
    var left_count = 0;
    var play_count = 0;
    var playrev_count = 0;
    var point = 0;
    var log;
    var turn;
    var cool;
    var hot;

    var turncontainer = document.getElementById('turn');
    var turnprogresscontainer = document.getElementById('turn-progress');
    var coolscorecontainer = document.getElementById('cool-score');
    var hotscorecontainer = document.getElementById('hot-score');
    var resultcontainer = document.getElementById('result');
    var reasoncontainer = document.getElementById('reason');

    var match_id = window.match_id;

    var requestOptions = {

        method: 'GET',

        headers: new Headers(),

        redirect: 'follow'

    };

    View();

    document.onkeyup = function (e) {
        if (e.key == "ArrowRight") nexted_flag = false;
        if (e.key == "ArrowLeft") preved_flag = false;
        if (e.key == "ArrowUp") last_flag = true;
        if (e.key == "ArrowDown") first_flag = true;
    }

    document.onkeydown = function (e) {
        if (e.key == "Enter") {
            play_flag = !play_flag;
            if (playrev_flag) playrev_flag = false;
        }
        if (e.shiftKey && e.key == "Enter") {
            playrev_flag = !playrev_flag;
            if (play_flag) play_flag = false;
        }
    }


    async function View() {
        function MapView()
        {
            var scene = new Scene();

            current = log[pointer];
            console.log(pointer);
            console.log(current);

            for (let y=0; y < size_y; y++) {
                for (let x=0; x < size_x; x++) {
                    var object = new Sprite(32, 32);
                    var img_path = ""
                    switch (current.map_data[y][x]) {
                        case 0:
                            img_path = '/images/None.png';
                            break;
                        case 2:
                            img_path = '/images/Block.png';
                            break;
                        case 3:
                            img_path = '/images/Item.png';
                            break;
                    }
                    object.image = core.assets[img_path];
                    object.x = x*32;
                    object.y = y*32;
                    scene.addChild(object);
                }
            }

            var [ cool_x, cool_y ] = current.cool_pos;
            var [ hot_x, hot_y ] = current.hot_pos;

            cool_score = current.cool_score;
            hot_score = current.hot_score;

            turncontainer.textContent = `turn: ${turn}`;
            turnprogresscontainer.style.width = `${turn_progress}%`
            coolscorecontainer.textContent = `cool score: ${cool_score}`;
            hotscorecontainer.textContent = `hot score: ${hot_score}`;
            resultcontainer.textContent = `result: ${result_text}`;
            reasoncontainer.textContent = `reason: ${reason}`;

            cool = new Sprite(32, 32);
            cool.image = core.assets['/images/Cool.png'];
            cool.x = cool_x*32;
            cool.y = cool_y*32;
            scene.addChild(cool);

            hot = new Sprite(32, 32);
            hot.image = core.assets['/images/Hot.png'];
            hot.x = hot_x*32;
            hot.y = hot_y*32;
            scene.addChild(hot);

            scene.addEventListener('enterframe', function() 
            {
                if (first_flag)
                {
                    pointer = 0;
                    turn = log[pointer].turn;
                    turn_progress = 0;
                    first_flag = false;
                    MapView();
                }
                if (last_flag)
                {
                    pointer = log.length - 1;
                    turn = log[pointer].turn;
                    turn_progress = 100;
                    last_flag = false;
                    MapView();
                }

                if(core.input.right)
                {
                    play_flag = false;
                    playrev_flag = false;
                    right_count++;
                }

                if(!nexted_flag)
                {
                    right_count = 0;
                }

                if(core.input.right && right_count%10 == 0 && pointer < log.length - 1)
                {
                    pointer += 2;
                    turn = log[pointer].turn;
                    turn_progress += dx;

                    nexted_flag = true;
                    MapView();
                }

                if(core.input.left)
                {
                    play_flag = false;
                    playrev_flag = false;
                    left_count++;
                }
                if(!preved_flag)
                {
                    left_count = 0;
                }
                if(core.input.left && left_count%10 == 0 && pointer > 0)
                {
                    pointer -= 2;
                    turn = log[pointer].turn;
                    turn_progress -= dx;
                    preved_flag = true;
                    MapView();
                }

                if (play_flag)
                {
                    play_count++;
                }
                if (!play_flag)
                {
                    play_count = 0;
                }
                if (play_flag && play_count%10 == 0 && pointer < log.length - 1)
                {
                    pointer += 2;
                    turn = log[pointer].turn;
                    turn_progress += dx;
                    MapView();
                }

                if (playrev_flag)
                {
                    playrev_count++;
                }
                if (!playrev_flag)
                {
                    playrev_count = 0;
                }
                if (playrev_flag && playrev_count%10 == 0 && pointer > 0)
                {
                    pointer -= 2;
                    turn = log[pointer].turn;
                    turn_progress -= dx;
                    MapView();
                }

                if (pointer == 0) {
                    turn_progress = 0;
                    playrev_flag = false;
                }

                if (pointer == log.length - 1) {
                    turn_progress = 100;
                    play_flag = false;
                }
            })


            core.replaceScene(scene);
        }

        var log = await (await fetch(`/api/logs/${match_id}`, requestOptions)).json();
        log = log.data;
        var result = await (await fetch(`/api/matchresults/${match_id}`, requestOptions)).json();
        result = result.data;

        var pointer = 0;
        var turn = log[0].turn;
        var turn_progress = 0;
        var dx = turn / 100;
        var [ size_x, size_y ] = log[0].map_size;
        var reason = result.reason;
        var result_text = result.result;

        //console.log(`map name: ${map_name}`);
        console.log(`turn: ${turn}`);
        console.log(`map size x: ${size_x}`);
        console.log(`map size y: ${size_y}`);
        //console.log(`cool name: ${cool_name}`);
        //console.log(`hot name: ${hot_name}`);
        console.log(`result: ${result_text}`);

        var core = new Core(32*size_x, 32*size_y);
        core.preload(['/images/None.png','/images/Block.png','/images/Item.png','/images/Cool.png','/images/Hot.png']);
        core.onload = function() {
            MapView(0);
        };


        core.start();
    }
}