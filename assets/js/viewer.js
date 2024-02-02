if (window.is_view)
{
    enchant();

    var nexted_flag = false;
    var preved_flag = false;
    var right_count = 0;
    var left_count = 0;
    var point = 0;
    var log;
    var turn;
    var cool;
    var hot;

    var match_id = window.match_id;

    var myHeaders = new Headers();

    var requestOptions = {

        method: 'GET',

        headers: myHeaders,

        redirect: 'follow'

    };

    fetch(`/api/logs?match_id=${match_id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        log = result.data;
        console.log(log);
        View();
    })

    document.onkeyup = function (e) {
        if (e.key == "ArrowRight") nexted_flag = false;
        if (e.key == "ArrowLeft") preved_flag = false;
    }


    function View() {
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

            cool_item = current.cool_item;
            hot_item = current.hot_item;

            if (pointer == log.length - 1)
            {
                end_caution = "game end !!";
            }
            else
            {
                end_caution = "";
            }

            var test_data = [`remain turn: ${turn}`,end_caution];

            test_data.forEach((elem, index) => {
                var label = new Label(elem);
                label.font = "24px Palatino";
                label.x = size_x*32 + 10;
                label.y = 20*index+10;
                scene.addChild(label);
            })

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
                if(core.input.right)
                {
                    right_count++;
                }

                if(!nexted_flag)
                {
                    right_count = 0;
                }

                if(core.input.right && right_count%10 == 0)
                {
                    if (pointer == log.length - 1)
                    {
                        end_caution = "game end!!";
                    }
                    else
                    {
                        end_caution = "";
                        pointer += 2;
                        turn = log[pointer].turn;
                    }

                    nexted_flag = true;
                    MapView();
                }
                if(core.input.left)
                {
                    left_count++;
                }
                if(!preved_flag)
                {
                    left_count = 0;
                }
                if(core.input.left && left_count%10 == 0 && pointer > 0)
                {
                    end_caution = "";
                    pointer -= 2;
                    turn = log[pointer].turn;
                    preved_flag = true;
                    MapView();
                }
            })

            core.replaceScene(scene);
        }

        var pointer = 0;
        var result_text, end_caution;
        var cool_item = 0;
        var hot_item = 0;
        turn = log[0].turn;
        var [ size_x, size_y ] = log[0].map_size;
        //var [ winner, result, reason ]  = log.pop().split(/,/);
        //if (winner)
        //{
            //result_text = `${winner} win`;
        //}
        //else
        //{
            //result_text = result;
        //}

        //console.log(`map name: ${map_name}`);
        console.log(`turn: ${turn}`);
        console.log(`map size x: ${size_x}`);
        console.log(`map size y: ${size_y}`);
        //console.log(`cool name: ${cool_name}`);
        //console.log(`hot name: ${hot_name}`);
        //console.log(`result: ${result_text}`);

        var core = new Core(960, 960);
        core.preload(['/images/None.png','/images/Block.png','/images/Item.png','/images/Cool.png','/images/Hot.png']);
        core.onload = function() {
            MapView(0);
        };


        core.start();
    }
}