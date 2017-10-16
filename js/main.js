        var comp = document.getElementById('comp');
        var user = document.getElementById('user');
        var user_cell = document.getElementsByClassName('user_cell');
        var whole_ship = document.getElementsByClassName('whole_ship');
        var ships = document.getElementById('ships');
        var start_game = document.getElementById('start_game');
        var reset_ships = document.getElementById('reset_ships');
        var new_game = document.getElementById('new_game');
        var strat_game_animation = document.getElementById('strat_game_animation');
        var hide_computer_field = document.getElementById('hide_computer_field');
        var gameOver_panel = document.getElementById('gameOver_panel');
        
        
        $(document).ready(function(){
        
        
        /*----------------------------------------Розстановка кораблів гравця----------------------------------------------*/
            
        for(var i = 0; i < 100; i++){                             //генеруємо поля гравця
            $('#user').append('<div class="user_cell"></div>');
        };
            
        var ship_left = 0;                                        //записуємо кількість кораблів які гравець вже розставив
        var whole_ship_children = 0;                              //записуємо кількість полів які має цілий корабель
        
            
        (function (){
            $('.whole_ship').draggable({
                
                start: function (event, ui) {
                    if((this).childElementCount == 4){
                        whole_ship_children = 4;
                    }else if((this).childElementCount == 3){
                        whole_ship_children = 3;
                    }else if((this).childElementCount == 2){
                        whole_ship_children = 2;
                    }else if((this).childElementCount == 1){
                        whole_ship_children = 1;
                    }
                    
                    $("#user").css({
                        "opacity": 0.8
                    });
                },
                
                stop: function (event, ui) {
                    $("#user").css({
                        "opacity": 1
                    });
                }
            });
            
            
            $('.user_cell').droppable({
                activeClass:'whole_ship',
                tolerance: 'pointer',
                drop:function(){
                    var ind = $(this).index();
                    if(whole_ship_children == 4){
                        $('.user_cell').eq(ind).addClass('user_ship');
                        $('.user_cell').eq(ind+10).addClass('user_ship');
                        $('.user_cell').eq(ind+20).addClass('user_ship');
                        $('.user_cell').eq(ind+30).addClass('user_ship');      
                    }else if(whole_ship_children == 3){
                        $('.user_cell').eq(ind).addClass('user_ship');
                        $('.user_cell').eq(ind+10).addClass('user_ship');
                        $('.user_cell').eq(ind+20).addClass('user_ship');     
                    }else if(whole_ship_children == 2){
                        $('.user_cell').eq(ind).addClass('user_ship');
                        $('.user_cell').eq(ind+10).addClass('user_ship');     
                    }else if(whole_ship_children == 1){
                        $('.user_cell').eq(ind).addClass('user_ship');     
                    }
                    whole_ship_children = 0;
                    ship_left++;
                    if(ship_left == 10){
                        $('#ships').fadeOut('slow');
                        $('#reset_ships').fadeOut('slow');
                        setInterval(function(){
                            start_game.style.display = 'block';
                        },600);
                        
                    }
                }
            });
        })();
        
        (function(){
            $('#reset_ships').on('click', function(){
                $('.whole_ship').each(function(){
                    $(this).attr('style', '');
                });
                $('.user_cell').removeClass('user_ship');
                ship_left = 0;
            });
        })();
        
               
            
        /*----------------------Розстановка полів і створення бан списку компютера--------------------------*/    
        
        var banList = [];                                  //список із заборонених полів (для розстановки кораблів компютера)
        
        for(var i = 0; i < 100; i++){                      //генеруємо поля компютера
            $('#comp').append('<div class="cell"></div>');
        };
        
        /*-------------------------------------Чотирьохярусний корабель------------------------------------*/

        (function (){
            
            var ship4  = Math.floor(Math.random()*70);                //генеруємо випадкове число для першої клітинки кораля
            
            //тут і в решті аналогічних строчках коду задаються поля корабля і неактивні поля навколо нього щоб інший корабель не міг зайняти ці поля
                
                if(ship4 < 10 && ship4 != 0 && ship4 != 9){
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');
                    $('.cell').eq(ship4+1).addClass('disabled');
                    $('.cell').eq(ship4+11).addClass('disabled');
                    $('.cell').eq(ship4+21).addClass('disabled');
                    $('.cell').eq(ship4+31).addClass('disabled');
                    $('.cell').eq(ship4+41).addClass('disabled');
                    $('.cell').eq(ship4+40).addClass('disabled');
                    $('.cell').eq(ship4+39).addClass('disabled');
                    $('.cell').eq(ship4+29).addClass('disabled');
                    $('.cell').eq(ship4+19).addClass('disabled');
                    $('.cell').eq(ship4+9).addClass('disabled');
                    $('.cell').eq(ship4-1).addClass('disabled');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-20).addClass('disabled');
                    $('.cell').eq(ship4-30).addClass('disabled');
                }
                else if(ship4 == 0){
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');                     
                    $('.cell').eq(ship4+1).addClass('disabled');
                    $('.cell').eq(ship4+11).addClass('disabled');
                    $('.cell').eq(ship4+21).addClass('disabled');
                    $('.cell').eq(ship4+31).addClass('disabled');
                    $('.cell').eq(ship4+41).addClass('disabled');
                    $('.cell').eq(ship4+40).addClass('disabled');
                }
                else if(ship4 == 9){
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');                     
                    $('.cell').eq(ship4+40).addClass('disabled');
                    $('.cell').eq(ship4+39).addClass('disabled');
                    $('.cell').eq(ship4+29).addClass('disabled');
                    $('.cell').eq(ship4+19).addClass('disabled');
                    $('.cell').eq(ship4+9).addClass('disabled');
                    $('.cell').eq(ship4-1).addClass('disabled');
                }
                else if(ship4%10 != 0 && ship4%10 != 9){
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');
                    $('.cell').eq(ship4-11).addClass('disabled');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-9).addClass('disabled');
                    $('.cell').eq(ship4+1).addClass('disabled');
                    $('.cell').eq(ship4+11).addClass('disabled');
                    $('.cell').eq(ship4+21).addClass('disabled');
                    $('.cell').eq(ship4+31).addClass('disabled');
                    $('.cell').eq(ship4+41).addClass('disabled');
                    $('.cell').eq(ship4+40).addClass('disabled');
                    $('.cell').eq(ship4+39).addClass('disabled');
                    $('.cell').eq(ship4+29).addClass('disabled');
                    $('.cell').eq(ship4+19).addClass('disabled');
                    $('.cell').eq(ship4+9).addClass('disabled');
                    $('.cell').eq(ship4-1).addClass('disabled');
                    $('.cell').eq(ship4-20).addClass('disabled');
                    $('.cell').eq(ship4-30).addClass('disabled');
                    $('.cell').eq(ship4-19).addClass('disabled');
                    $('.cell').eq(ship4-21).addClass('disabled');
                    $('.cell').eq(ship4-29).addClass('disabled');
                    $('.cell').eq(ship4-31).addClass('disabled');         
                }
                else if(ship4%10 == 0){                     
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-9).addClass('disabled');
                    $('.cell').eq(ship4+1).addClass('disabled');
                    $('.cell').eq(ship4+11).addClass('disabled');
                    $('.cell').eq(ship4+21).addClass('disabled');
                    $('.cell').eq(ship4+31).addClass('disabled');
                    $('.cell').eq(ship4+41).addClass('disabled');
                    $('.cell').eq(ship4+40).addClass('disabled');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-20).addClass('disabled');
                    $('.cell').eq(ship4-30).addClass('disabled');
                    $('.cell').eq(ship4-19).addClass('disabled');
                    $('.cell').eq(ship4-29).addClass('disabled');
                }
                else if(ship4%10 == 9){            
                    $('.cell').eq(ship4).addClass('ship');
                    $('.cell').eq(ship4+10).addClass('ship');
                    $('.cell').eq(ship4+20).addClass('ship');
                    $('.cell').eq(ship4+30).addClass('ship');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-11).addClass('disabled');
                    $('.cell').eq(ship4-1).addClass('disabled');
                    $('.cell').eq(ship4+9).addClass('disabled');
                    $('.cell').eq(ship4+19).addClass('disabled');
                    $('.cell').eq(ship4+29).addClass('disabled');
                    $('.cell').eq(ship4+39).addClass('disabled');
                    $('.cell').eq(ship4+40).addClass('disabled');
                    $('.cell').eq(ship4-10).addClass('disabled');
                    $('.cell').eq(ship4-20).addClass('disabled');
                    $('.cell').eq(ship4-30).addClass('disabled');
                    $('.cell').eq(ship4-21).addClass('disabled');
                    $('.cell').eq(ship4-31).addClass('disabled');
                }
            
            //додаємо всі зайняті поля в список заборонених полів
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
            
        /*---------------------------------------Тьохярусний перший корабель-----------------------------------------------*/
            
        (function (){
            
            var ship3_1;
            
            (function (){
                var valid = false;
                while(!valid){
                    ship3_1  = Math.floor(Math.random()*80);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship3_1){
                            valid = false;
                            break;
                        }
                    }
                }
            })();            
            
            
            if(ship3_1 < 10 && ship3_1 != 0 && ship3_1 != 9){
                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');
                $('.cell').eq(ship3_1+1).addClass('disabled');
                $('.cell').eq(ship3_1+11).addClass('disabled');
                $('.cell').eq(ship3_1+21).addClass('disabled');
                $('.cell').eq(ship3_1+31).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
                $('.cell').eq(ship3_1+29).addClass('disabled');
                $('.cell').eq(ship3_1+19).addClass('disabled');
                $('.cell').eq(ship3_1+9).addClass('disabled');
                $('.cell').eq(ship3_1-1).addClass('disabled');
            }
            else if(ship3_1 == 0){

                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');        
                $('.cell').eq(ship3_1+1).addClass('disabled');
                $('.cell').eq(ship3_1+11).addClass('disabled');
                $('.cell').eq(ship3_1+21).addClass('disabled');
                $('.cell').eq(ship3_1+31).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
            }
            else if(ship3_1 == 9){
                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');           
                $('.cell').eq(ship3_1+29).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
                $('.cell').eq(ship3_1+19).addClass('disabled');
                $('.cell').eq(ship3_1+9).addClass('disabled');
                $('.cell').eq(ship3_1-1).addClass('disabled');
            }
            else if(ship3_1%10 != 0 && ship3_1%10 != 9){
                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');
                $('.cell').eq(ship3_1-11).addClass('disabled');
                $('.cell').eq(ship3_1-10).addClass('disabled');
                $('.cell').eq(ship3_1-9).addClass('disabled');
                $('.cell').eq(ship3_1+1).addClass('disabled');
                $('.cell').eq(ship3_1+11).addClass('disabled');
                $('.cell').eq(ship3_1+21).addClass('disabled');
                $('.cell').eq(ship3_1+31).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
                $('.cell').eq(ship3_1+29).addClass('disabled');
                $('.cell').eq(ship3_1+19).addClass('disabled');
                $('.cell').eq(ship3_1+9).addClass('disabled');
                $('.cell').eq(ship3_1-1).addClass('disabled');
                $('.cell').eq(ship3_1-20).addClass('disabled');
                $('.cell').eq(ship3_1-30).addClass('disabled');
                $('.cell').eq(ship3_1-19).addClass('disabled');
                $('.cell').eq(ship3_1-21).addClass('disabled');
                $('.cell').eq(ship3_1-29).addClass('disabled');
                $('.cell').eq(ship3_1-31).addClass('disabled');
            }
            else if(ship3_1%10 == 0){
                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');
                $('.cell').eq(ship3_1-10).addClass('disabled');
                $('.cell').eq(ship3_1-9).addClass('disabled');
                $('.cell').eq(ship3_1+1).addClass('disabled');
                $('.cell').eq(ship3_1+11).addClass('disabled');
                $('.cell').eq(ship3_1+21).addClass('disabled');
                $('.cell').eq(ship3_1+31).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
                $('.cell').eq(ship3_1-20).addClass('disabled');
                $('.cell').eq(ship3_1-30).addClass('disabled');
                $('.cell').eq(ship3_1-21).addClass('disabled');
                $('.cell').eq(ship3_1-31).addClass('disabled');
            }
            else if(ship3_1%10 == 9){
                $('.cell').eq(ship3_1).addClass('ship');
                $('.cell').eq(ship3_1+10).addClass('ship');
                $('.cell').eq(ship3_1+20).addClass('ship');
                $('.cell').eq(ship3_1-10).addClass('disabled');
                $('.cell').eq(ship3_1-11).addClass('disabled');
                $('.cell').eq(ship3_1-1).addClass('disabled');
                $('.cell').eq(ship3_1+9).addClass('disabled');
                $('.cell').eq(ship3_1+19).addClass('disabled');
                $('.cell').eq(ship3_1+29).addClass('disabled');
                $('.cell').eq(ship3_1+30).addClass('disabled');
                $('.cell').eq(ship3_1-20).addClass('disabled');
                $('.cell').eq(ship3_1-30).addClass('disabled');
                $('.cell').eq(ship3_1-19).addClass('disabled');
                $('.cell').eq(ship3_1-29).addClass('disabled');
            }
            
            //очищуємо список заборонених полів для того щоб заново його заповнити
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
        
        /*-------------------------------Тьохярусний другий корабель------------------------------------*/
         
        (function (){
            
            var ship3_2;

            (function (){
                var valid = false;
                while(!valid){
                    ship3_2  = Math.floor(Math.random()*80);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship3_2){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship3_2 < 10 && ship3_2 != 0 && ship3_2 != 9){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');
                $('.cell').eq(ship3_2+1).addClass('disabled');
                $('.cell').eq(ship3_2+11).addClass('disabled');
                $('.cell').eq(ship3_2+21).addClass('disabled');
                $('.cell').eq(ship3_2+31).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
                $('.cell').eq(ship3_2+29).addClass('disabled');
                $('.cell').eq(ship3_2+19).addClass('disabled');
                $('.cell').eq(ship3_2+9).addClass('disabled');
                $('.cell').eq(ship3_2-1).addClass('disabled');
            }
            else if(ship3_2 == 0){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');        
                $('.cell').eq(ship3_2+1).addClass('disabled');
                $('.cell').eq(ship3_2+11).addClass('disabled');
                $('.cell').eq(ship3_2+21).addClass('disabled');
                $('.cell').eq(ship3_2+31).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
            }
            else if(ship3_2 == 9){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');           
                $('.cell').eq(ship3_2+29).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
                $('.cell').eq(ship3_2+19).addClass('disabled');
                $('.cell').eq(ship3_2+9).addClass('disabled');
                $('.cell').eq(ship3_2-1).addClass('disabled');
            }
            else if(ship3_2%10 != 0 && ship3_2%10 != 9){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');
                $('.cell').eq(ship3_2-11).addClass('disabled');
                $('.cell').eq(ship3_2-10).addClass('disabled');
                $('.cell').eq(ship3_2-9).addClass('disabled');
                $('.cell').eq(ship3_2+1).addClass('disabled');
                $('.cell').eq(ship3_2+11).addClass('disabled');
                $('.cell').eq(ship3_2+21).addClass('disabled');
                $('.cell').eq(ship3_2+31).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
                $('.cell').eq(ship3_2+29).addClass('disabled');
                $('.cell').eq(ship3_2+19).addClass('disabled');
                $('.cell').eq(ship3_2+9).addClass('disabled');
                $('.cell').eq(ship3_2-1).addClass('disabled');
                $('.cell').eq(ship3_2-20).addClass('disabled');
                $('.cell').eq(ship3_2-30).addClass('disabled');
                $('.cell').eq(ship3_2-19).addClass('disabled');
                $('.cell').eq(ship3_2-21).addClass('disabled');
            }
            else if(ship3_2%10 == 0){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');
                $('.cell').eq(ship3_2-10).addClass('disabled');
                $('.cell').eq(ship3_2-9).addClass('disabled');
                $('.cell').eq(ship3_2+1).addClass('disabled');
                $('.cell').eq(ship3_2+11).addClass('disabled');
                $('.cell').eq(ship3_2+21).addClass('disabled');
                $('.cell').eq(ship3_2+31).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
                $('.cell').eq(ship3_2-20).addClass('disabled');
                $('.cell').eq(ship3_2-30).addClass('disabled');
                $('.cell').eq(ship3_2-21).addClass('disabled');
            }
            else if(ship3_2%10 == 9){
                $('.cell').eq(ship3_2).addClass('ship');
                $('.cell').eq(ship3_2+10).addClass('ship');
                $('.cell').eq(ship3_2+20).addClass('ship');
                $('.cell').eq(ship3_2-10).addClass('disabled');
                $('.cell').eq(ship3_2-11).addClass('disabled');
                $('.cell').eq(ship3_2-1).addClass('disabled');
                $('.cell').eq(ship3_2+9).addClass('disabled');
                $('.cell').eq(ship3_2+19).addClass('disabled');
                $('.cell').eq(ship3_2+29).addClass('disabled');
                $('.cell').eq(ship3_2+30).addClass('disabled');
                $('.cell').eq(ship3_2-20).addClass('disabled');
                $('.cell').eq(ship3_2-30).addClass('disabled');
                $('.cell').eq(ship3_2-19).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
            
        /*----------------------------------------Двохярусний перший корабель-------------------------------------------*/    
                
        (function (){
            
            var ship2_1;
            
            (function (){
                var valid = false;
                while(!valid){
                    ship2_1  = Math.floor(Math.random()*90);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship2_1){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship2_1 < 10 && ship2_1 != 0 && ship2_1 != 9){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');
                $('.cell').eq(ship2_1+1).addClass('disabled');
                $('.cell').eq(ship2_1+11).addClass('disabled');
                $('.cell').eq(ship2_1+21).addClass('disabled');
                $('.cell').eq(ship2_1+20).addClass('disabled');
                $('.cell').eq(ship2_1+19).addClass('disabled');
                $('.cell').eq(ship2_1+9).addClass('disabled');
                $('.cell').eq(ship2_1-1).addClass('disabled');
            }
            else if(ship2_1 == 0){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');       
                $('.cell').eq(ship2_1+1).addClass('disabled');
                $('.cell').eq(ship2_1+11).addClass('disabled');
                $('.cell').eq(ship2_1+21).addClass('disabled');
                $('.cell').eq(ship2_1+20).addClass('disabled');
            }
            else if(ship2_1 == 9){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');           
                $('.cell').eq(ship2_1+20).addClass('disabled');
                $('.cell').eq(ship2_1+19).addClass('disabled');
                $('.cell').eq(ship2_1+9).addClass('disabled');
                $('.cell').eq(ship2_1-1).addClass('disabled');
            }
            else if(ship2_1%10 != 0 && ship2_1%10 != 9){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');
                $('.cell').eq(ship2_1-11).addClass('disabled');
                $('.cell').eq(ship2_1-10).addClass('disabled');
                $('.cell').eq(ship2_1-9).addClass('disabled');
                $('.cell').eq(ship2_1+1).addClass('disabled');
                $('.cell').eq(ship2_1+11).addClass('disabled');
                $('.cell').eq(ship2_1+21).addClass('disabled');
                $('.cell').eq(ship2_1+20).addClass('disabled');
                $('.cell').eq(ship2_1+19).addClass('disabled');
                $('.cell').eq(ship2_1+9).addClass('disabled');
                $('.cell').eq(ship2_1-1).addClass('disabled');
                $('.cell').eq(ship2_1-20).addClass('disabled');
                $('.cell').eq(ship2_1-19).addClass('disabled');
                $('.cell').eq(ship2_1-21).addClass('disabled');
            }
            else if(ship2_1%10 == 0){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');
                $('.cell').eq(ship2_1-10).addClass('disabled');
                $('.cell').eq(ship2_1-9).addClass('disabled');
                $('.cell').eq(ship2_1+1).addClass('disabled');
                $('.cell').eq(ship2_1+11).addClass('disabled');
                $('.cell').eq(ship2_1+21).addClass('disabled');
                $('.cell').eq(ship2_1+20).addClass('disabled');
                $('.cell').eq(ship2_1-20).addClass('disabled');
                $('.cell').eq(ship2_1-21).addClass('disabled');
            }
            else if(ship2_1%10 == 9){
                $('.cell').eq(ship2_1).addClass('ship');
                $('.cell').eq(ship2_1+10).addClass('ship');
                $('.cell').eq(ship2_1-10).addClass('disabled');
                $('.cell').eq(ship2_1-11).addClass('disabled');
                $('.cell').eq(ship2_1-1).addClass('disabled');
                $('.cell').eq(ship2_1+9).addClass('disabled');
                $('.cell').eq(ship2_1+19).addClass('disabled');
                $('.cell').eq(ship2_1+20).addClass('disabled');
                $('.cell').eq(ship2_1-20).addClass('disabled');
                $('.cell').eq(ship2_1-19).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
          
        })();
        
        /*----------------------------------------Двохярусний другий корабель-------------------------------------------*/    
            
        (function (){
            
            var ship2_2;

            (function (){
                var valid = false;
                while(!valid){
                    ship2_2  = Math.floor(Math.random()*90);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship2_2){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship2_2 < 10 && ship2_2 != 0 && ship2_2 != 9){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');
                $('.cell').eq(ship2_2+1).addClass('disabled');
                $('.cell').eq(ship2_2+11).addClass('disabled');
                $('.cell').eq(ship2_2+21).addClass('disabled');
                $('.cell').eq(ship2_2+20).addClass('disabled');
                $('.cell').eq(ship2_2+19).addClass('disabled');
                $('.cell').eq(ship2_2+9).addClass('disabled');
                $('.cell').eq(ship2_2-1).addClass('disabled');
            }
            else if(ship2_2 == 0){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');       
                $('.cell').eq(ship2_2+1).addClass('disabled');
                $('.cell').eq(ship2_2+11).addClass('disabled');
                $('.cell').eq(ship2_2+21).addClass('disabled');
                $('.cell').eq(ship2_2+20).addClass('disabled');
            }
            else if(ship2_2 == 9){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');           
                $('.cell').eq(ship2_2+20).addClass('disabled');
                $('.cell').eq(ship2_2+19).addClass('disabled');
                $('.cell').eq(ship2_2+9).addClass('disabled');
                $('.cell').eq(ship2_2-1).addClass('disabled');
            }
            else if(ship2_2%10 != 0 && ship2_2%10 != 9){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');
                $('.cell').eq(ship2_2-11).addClass('disabled');
                $('.cell').eq(ship2_2-10).addClass('disabled');
                $('.cell').eq(ship2_2-9).addClass('disabled');
                $('.cell').eq(ship2_2+1).addClass('disabled');
                $('.cell').eq(ship2_2+11).addClass('disabled');
                $('.cell').eq(ship2_2+21).addClass('disabled');
                $('.cell').eq(ship2_2+20).addClass('disabled');
                $('.cell').eq(ship2_2+19).addClass('disabled');
                $('.cell').eq(ship2_2+9).addClass('disabled');
                $('.cell').eq(ship2_2-1).addClass('disabled');
                $('.cell').eq(ship2_2-20).addClass('disabled');
                $('.cell').eq(ship2_2-19).addClass('disabled');
                $('.cell').eq(ship2_2-21).addClass('disabled');
            }
            else if(ship2_2%10 == 0){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');
                $('.cell').eq(ship2_2-10).addClass('disabled');
                $('.cell').eq(ship2_2-9).addClass('disabled');
                $('.cell').eq(ship2_2+1).addClass('disabled');
                $('.cell').eq(ship2_2+11).addClass('disabled');
                $('.cell').eq(ship2_2+21).addClass('disabled');
                $('.cell').eq(ship2_2+20).addClass('disabled');
                $('.cell').eq(ship2_2-20).addClass('disabled');
                $('.cell').eq(ship2_2-21).addClass('disabled');
            }
            else if(ship2_2%10 == 9){
                $('.cell').eq(ship2_2).addClass('ship');
                $('.cell').eq(ship2_2+10).addClass('ship');
                $('.cell').eq(ship2_2-10).addClass('disabled');
                $('.cell').eq(ship2_2-11).addClass('disabled');
                $('.cell').eq(ship2_2-1).addClass('disabled');
                $('.cell').eq(ship2_2+9).addClass('disabled');
                $('.cell').eq(ship2_2+19).addClass('disabled');
                $('.cell').eq(ship2_2+20).addClass('disabled');
                $('.cell').eq(ship2_2-20).addClass('disabled');
                $('.cell').eq(ship2_2-19).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
        
        /*----------------------------------------Двохярусний третій корабель-------------------------------------------*/    
            
        
            
        (function (){
            
            var ship2_3;

            (function (){
                var valid = false;
                while(!valid){
                    ship2_3  = Math.floor(Math.random()*90);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship2_3){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship2_3 < 10 && ship2_3 != 0 && ship2_3 != 9){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');
                $('.cell').eq(ship2_3+1).addClass('disabled');
                $('.cell').eq(ship2_3+11).addClass('disabled');
                $('.cell').eq(ship2_3+21).addClass('disabled');
                $('.cell').eq(ship2_3+20).addClass('disabled');
                $('.cell').eq(ship2_3+19).addClass('disabled');
                $('.cell').eq(ship2_3+9).addClass('disabled');
                $('.cell').eq(ship2_3-1).addClass('disabled');
            }
            else if(ship2_3 == 0){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');       
                $('.cell').eq(ship2_3+1).addClass('disabled');
                $('.cell').eq(ship2_3+11).addClass('disabled');
                $('.cell').eq(ship2_3+21).addClass('disabled');
                $('.cell').eq(ship2_3+20).addClass('disabled');
            }
            else if(ship2_3 == 9){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');           
                $('.cell').eq(ship2_3+20).addClass('disabled');
                $('.cell').eq(ship2_3+19).addClass('disabled');
                $('.cell').eq(ship2_3+9).addClass('disabled');
                $('.cell').eq(ship2_3-1).addClass('disabled');
            }
            else if(ship2_3%10 != 0 && ship2_3%10 != 9){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');
                $('.cell').eq(ship2_3-11).addClass('disabled');
                $('.cell').eq(ship2_3-10).addClass('disabled');
                $('.cell').eq(ship2_3-9).addClass('disabled');
                $('.cell').eq(ship2_3+1).addClass('disabled');
                $('.cell').eq(ship2_3+11).addClass('disabled');
                $('.cell').eq(ship2_3+21).addClass('disabled');
                $('.cell').eq(ship2_3+20).addClass('disabled');
                $('.cell').eq(ship2_3+19).addClass('disabled');
                $('.cell').eq(ship2_3+9).addClass('disabled');
                $('.cell').eq(ship2_3-1).addClass('disabled');
                $('.cell').eq(ship2_3-20).addClass('disabled');
            }
            else if(ship2_3%10 == 0){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');
                $('.cell').eq(ship2_3-10).addClass('disabled');
                $('.cell').eq(ship2_3-9).addClass('disabled');
                $('.cell').eq(ship2_3+1).addClass('disabled');
                $('.cell').eq(ship2_3+11).addClass('disabled');
                $('.cell').eq(ship2_3+21).addClass('disabled');
                $('.cell').eq(ship2_3+20).addClass('disabled');
                $('.cell').eq(ship2_3-20).addClass('disabled');
            }
            else if(ship2_3%10 == 9){
                $('.cell').eq(ship2_3).addClass('ship');
                $('.cell').eq(ship2_3+10).addClass('ship');
                $('.cell').eq(ship2_3-10).addClass('disabled');
                $('.cell').eq(ship2_3-11).addClass('disabled');
                $('.cell').eq(ship2_3-1).addClass('disabled');
                $('.cell').eq(ship2_3+9).addClass('disabled');
                $('.cell').eq(ship2_3+19).addClass('disabled');
                $('.cell').eq(ship2_3+20).addClass('disabled');
                $('.cell').eq(ship2_3-20).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
        
        /*---------------------------------------Одноярусний перший корабель--------------------------------------------*/
            
        (function (){
            
            var ship1_1;
        
            (function (){
                var valid = false;
                while(!valid){
                    ship1_1  = Math.floor(Math.random()*100);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship1_1){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship1_1 < 10 && ship1_1 != 0 && ship1_1 != 9){
                $('.cell').eq(ship1_1).addClass('ship');
                $('.cell').eq(ship1_1+1).addClass('disabled');
                $('.cell').eq(ship1_1+11).addClass('disabled');
                $('.cell').eq(ship1_1+10).addClass('disabled');
                $('.cell').eq(ship1_1+9).addClass('disabled');
                $('.cell').eq(ship1_1-1).addClass('disabled');
            }
            else if(ship1_1 == 0){
                $('.cell').eq(ship1_1).addClass('ship');       
                $('.cell').eq(ship1_1+1).addClass('disabled');
                $('.cell').eq(ship1_1+11).addClass('disabled');
                $('.cell').eq(ship1_1+10).addClass('disabled');
            }
            else if(ship1_1 == 9){
                $('.cell').eq(ship1_1).addClass('ship');        
                $('.cell').eq(ship1_1+10).addClass('disabled');
                $('.cell').eq(ship1_1+9).addClass('disabled');
                $('.cell').eq(ship1_1-1).addClass('disabled');
            }
            else if(ship1_1%10 != 0 && ship1_1%10 != 9){
                $('.cell').eq(ship1_1).addClass('ship');
                $('.cell').eq(ship1_1-11).addClass('disabled');
                $('.cell').eq(ship1_1-10).addClass('disabled');
                $('.cell').eq(ship1_1-9).addClass('disabled');
                $('.cell').eq(ship1_1+1).addClass('disabled');
                $('.cell').eq(ship1_1+11).addClass('disabled');
                $('.cell').eq(ship1_1+10).addClass('disabled');
                $('.cell').eq(ship1_1+9).addClass('disabled');
                $('.cell').eq(ship1_1-1).addClass('disabled');
            }
            else if(ship1_1%10 == 0){
                $('.cell').eq(ship1_1).addClass('ship');
                $('.cell').eq(ship1_1-10).addClass('disabled');
                $('.cell').eq(ship1_1-9).addClass('disabled');
                $('.cell').eq(ship1_1+1).addClass('disabled');
                $('.cell').eq(ship1_1+11).addClass('disabled');
                $('.cell').eq(ship1_1+10).addClass('disabled');
            }
            else if(ship1_1%10 == 9){
                $('.cell').eq(ship1_1).addClass('ship');
                $('.cell').eq(ship1_1-10).addClass('disabled');
                $('.cell').eq(ship1_1-11).addClass('disabled');
                $('.cell').eq(ship1_1-1).addClass('disabled');
                $('.cell').eq(ship1_1+9).addClass('disabled');
                $('.cell').eq(ship1_1+10).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
        
        /*----------------------------------------Одноярусний другий корабель-------------------------------------------*/    
            
        (function (){
            
            var ship1_2;
            
            (function (){
                var valid = false;
                while(!valid){
                    ship1_2  = Math.floor(Math.random()*100);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship1_2){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship1_2 < 10 && ship1_2 != 0 && ship1_2 != 9){
                $('.cell').eq(ship1_2).addClass('ship');
                $('.cell').eq(ship1_2+1).addClass('disabled');
                $('.cell').eq(ship1_2+11).addClass('disabled');
                $('.cell').eq(ship1_2+10).addClass('disabled');
                $('.cell').eq(ship1_2+9).addClass('disabled');
                $('.cell').eq(ship1_2-1).addClass('disabled');
            }
            else if(ship1_2 == 0){
                $('.cell').eq(ship1_2).addClass('ship');       
                $('.cell').eq(ship1_2+1).addClass('disabled');
                $('.cell').eq(ship1_2+11).addClass('disabled');
                $('.cell').eq(ship1_2+10).addClass('disabled');
            }
            else if(ship1_2 == 9){
                $('.cell').eq(ship1_2).addClass('ship');        
                $('.cell').eq(ship1_2+10).addClass('disabled');
                $('.cell').eq(ship1_2+9).addClass('disabled');
                $('.cell').eq(ship1_2-1).addClass('disabled');
            }
            else if(ship1_2%10 != 0 && ship1_2%10 != 9){
                $('.cell').eq(ship1_2).addClass('ship');
                $('.cell').eq(ship1_2-11).addClass('disabled');
                $('.cell').eq(ship1_2-10).addClass('disabled');
                $('.cell').eq(ship1_2-9).addClass('disabled');
                $('.cell').eq(ship1_2+1).addClass('disabled');
                $('.cell').eq(ship1_2+11).addClass('disabled');
                $('.cell').eq(ship1_2+10).addClass('disabled');
                $('.cell').eq(ship1_2+9).addClass('disabled');
                $('.cell').eq(ship1_2-1).addClass('disabled');
            }
            else if(ship1_2%10 == 0){
                $('.cell').eq(ship1_2).addClass('ship');
                $('.cell').eq(ship1_2-10).addClass('disabled');
                $('.cell').eq(ship1_2-9).addClass('disabled');
                $('.cell').eq(ship1_2+1).addClass('disabled');
                $('.cell').eq(ship1_2+11).addClass('disabled');
                $('.cell').eq(ship1_2+10).addClass('disabled');
            }
            else if(ship1_2%10 == 9){
                $('.cell').eq(ship1_2).addClass('ship');
                $('.cell').eq(ship1_2-10).addClass('disabled');
                $('.cell').eq(ship1_2-11).addClass('disabled');
                $('.cell').eq(ship1_2-1).addClass('disabled');
                $('.cell').eq(ship1_2+9).addClass('disabled');
                $('.cell').eq(ship1_2+10).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
        
        /*-----------------------------------------Одноярусний третій корабель------------------------------------------*/    
                 
        (function (){
            
            var ship1_3;
            
            (function (){
                var valid = false;
                while(!valid){
                    ship1_3  = Math.floor(Math.random()*100);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship1_3){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship1_3 < 10 && ship1_3 != 0 && ship1_3 != 9){
                $('.cell').eq(ship1_3).addClass('ship');
                $('.cell').eq(ship1_3+1).addClass('disabled');
                $('.cell').eq(ship1_3+11).addClass('disabled');
                $('.cell').eq(ship1_3+10).addClass('disabled');
                $('.cell').eq(ship1_3+9).addClass('disabled');
                $('.cell').eq(ship1_3-1).addClass('disabled');
            }
            else if(ship1_3 == 0){
                $('.cell').eq(ship1_3).addClass('ship');       
                $('.cell').eq(ship1_3+1).addClass('disabled');
                $('.cell').eq(ship1_3+11).addClass('disabled');
                $('.cell').eq(ship1_3+10).addClass('disabled');
            }
            else if(ship1_3 == 9){
                $('.cell').eq(ship1_3).addClass('ship');        
                $('.cell').eq(ship1_3+10).addClass('disabled');
                $('.cell').eq(ship1_3+9).addClass('disabled');
                $('.cell').eq(ship1_3-1).addClass('disabled');
            }
            else if(ship1_3%10 != 0 && ship1_3%10 != 9){
                $('.cell').eq(ship1_3).addClass('ship');
                $('.cell').eq(ship1_3-11).addClass('disabled');
                $('.cell').eq(ship1_3-10).addClass('disabled');
                $('.cell').eq(ship1_3-9).addClass('disabled');
                $('.cell').eq(ship1_3+1).addClass('disabled');
                $('.cell').eq(ship1_3+11).addClass('disabled');
                $('.cell').eq(ship1_3+10).addClass('disabled');
                $('.cell').eq(ship1_3+9).addClass('disabled');
                $('.cell').eq(ship1_3-1).addClass('disabled');
            }
            else if(ship1_3%10 == 0){
                $('.cell').eq(ship1_3).addClass('ship');
                $('.cell').eq(ship1_3-10).addClass('disabled');
                $('.cell').eq(ship1_3-9).addClass('disabled');
                $('.cell').eq(ship1_3+1).addClass('disabled');
                $('.cell').eq(ship1_3+11).addClass('disabled');
                $('.cell').eq(ship1_3+10).addClass('disabled');
            }
            else if(ship1_3%10 == 9){
                $('.cell').eq(ship1_3).addClass('ship');
                $('.cell').eq(ship1_3-10).addClass('disabled');
                $('.cell').eq(ship1_3-11).addClass('disabled');
                $('.cell').eq(ship1_3-1).addClass('disabled');
                $('.cell').eq(ship1_3+9).addClass('disabled');
                $('.cell').eq(ship1_3+10).addClass('disabled');
            }
            
            banList = [];
            
            for(var i = 0; i < 100; i++){
                if($('.cell').eq(i).hasClass('disabled') || $('.cell').eq(i).hasClass('ship')){
                    banList.push(i);
                }
            };
            
        })();
            
        /*--------------------------------------Одноярусний четвертий корабель------------------------------------------*/    
                
        (function (){
            
            var ship1_4;
            
            (function (){
                var valid = false;
                while(!valid){
                    ship1_4  = Math.floor(Math.random()*100);
                    valid = true;
                    for(var i = 0; i < banList.length; i++){
                        if(banList[i] == ship1_4){
                            valid = false;
                            break;
                        }
                    }
                }
            })();
            
            if(ship1_4 < 10 && ship1_4 != 0 && ship1_4 != 9){
                $('.cell').eq(ship1_4).addClass('ship');
                $('.cell').eq(ship1_4+1).addClass('disabled');
                $('.cell').eq(ship1_4+11).addClass('disabled');
                $('.cell').eq(ship1_4+10).addClass('disabled');
                $('.cell').eq(ship1_4+9).addClass('disabled');
                $('.cell').eq(ship1_4-1).addClass('disabled');
            }
            else if(ship1_4 == 0){
                $('.cell').eq(ship1_4).addClass('ship');       
                $('.cell').eq(ship1_4+1).addClass('disabled');
                $('.cell').eq(ship1_4+11).addClass('disabled');
                $('.cell').eq(ship1_4+10).addClass('disabled');
            }
            else if(ship1_4 == 9){
                $('.cell').eq(ship1_4).addClass('ship');        
                $('.cell').eq(ship1_4+10).addClass('disabled');
                $('.cell').eq(ship1_4+9).addClass('disabled');
                $('.cell').eq(ship1_4-1).addClass('disabled');
            }
            else if(ship1_4%10 != 0 && ship1_4%10 != 9){
                $('.cell').eq(ship1_4).addClass('ship');
                $('.cell').eq(ship1_4-11).addClass('disabled');
                $('.cell').eq(ship1_4-10).addClass('disabled');
                $('.cell').eq(ship1_4-9).addClass('disabled');
                $('.cell').eq(ship1_4+1).addClass('disabled');
                $('.cell').eq(ship1_4+11).addClass('disabled');
                $('.cell').eq(ship1_4+10).addClass('disabled');
                $('.cell').eq(ship1_4+9).addClass('disabled');
                $('.cell').eq(ship1_4-1).addClass('disabled');
            }
            else if(ship1_4%10 == 0){
                $('.cell').eq(ship1_4).addClass('ship');
                $('.cell').eq(ship1_4-10).addClass('disabled');
                $('.cell').eq(ship1_4-9).addClass('disabled');
                $('.cell').eq(ship1_4+1).addClass('disabled');
                $('.cell').eq(ship1_4+11).addClass('disabled');
                $('.cell').eq(ship1_4+10).addClass('disabled');
            }
            else if(ship1_4%10 == 9){
                $('.cell').eq(ship1_4).addClass('ship');
                $('.cell').eq(ship1_4-10).addClass('disabled');
                $('.cell').eq(ship1_4-11).addClass('disabled');
                $('.cell').eq(ship1_4-1).addClass('disabled');
                $('.cell').eq(ship1_4+9).addClass('disabled');
                $('.cell').eq(ship1_4+10).addClass('disabled');
            }
        })();
            
        /*--------------------------------------Початок і логіка гри компютера------------------------------------------*/
            
        $('#start_game').one('click', function(){                           //при кліку запускається гра
            
            start_game.style.backgroundColor = 'gray';
            strat_game_animation.style.display = 'block';
            
            startGameAnimation();                                           //анімація початку гри
            
            $('.cell').on('click', function(){                              //додаємо слухач до кожного поля компютера
            
                if($(this).hasClass('ship')){
                    $(this).removeClass('ship');
                    $(this).addClass('shooted');
                    
                    hide_computer_field.style.display = 'block';
                    
                    setTimeout(function(){                                  //про ході компютера блокуємо панель
                        hide_computer_field.style.display = 'none';
                        computerShooting();
                    }, 1000);
                    
                        if($('.ship').length == 0){
                            alert("YOU WIN!");
                            gameOver_panel.style.display = 'block';         //панель для блокування при виграші
                            new_game.style.display = 'block';
                        }
                
                }else if($(this).hasClass('shooted') || $(this).hasClass('missed')){
                    //here we do nothing   
                }else if($(this).hasClass('disabled') || $(this).hasClass('cell')){
                    $(this).addClass('missed');
                    
                    hide_computer_field.style.display = 'block';
                    
                    setTimeout(function(){
                        computerShooting();
                        hide_computer_field.style.display = 'none';
                    }, 1000);
                }                        
            });     
        });
        
               
        var computerChoise;                                                 //число вибране компютером для пострілу
        
        var up_or_down = 1;                                                 //визначник пострілу вверх чи вниз
        
        var banUserList = [];                                               //список полів в які компютер вже стріляв
        
        function getAvailableField(){                                       //визнааємо вільне поле для пострілу
        
            var valid = false;
            while(!valid){
                if(good_shoot == undefined){
     
                    computerChoise = Math.floor(Math.random()*100);
                    valid = true;
                    for(var i = 0; i < banUserList.length; i++){
                        if(banUserList[i] == computerChoise){
                            valid = false;
                            break;
                        }
                    }
                }else{
                    
                    if(up_or_down == 2){
                        good_shoot = good_shoot + 10;
                        computerChoise = good_shoot;
                        up_or_down = 3;
                            if(good_shoot > 99 || $('.user_cell').eq(good_shoot).hasClass('user_shooted') || $('.user_cell').eq(good_shoot).hasClass('missed')) {
                                good_shoot = good_shoot - 20;
                                computerChoise = good_shoot;
                                up_or_down = 1;
                                if(good_shoot < 0 || $('.user_cell').eq(good_shoot).hasClass('user_shooted') || $('.user_cell').eq(good_shoot).hasClass('missed')){
                                    good_shoot = Math.floor(Math.random()*100);
                                    computerChoise = good_shoot;
                                    good_shoot = undefined;
                                    up_or_down = 1;
                                }
                            }
                    }else if(up_or_down == 4){ 
                        good_shoot = good_shoot - 20;
                        computerChoise = good_shoot;
                        up_or_down = 1;
                            if(good_shoot < 0 || $('.user_cell').eq(good_shoot).hasClass('user_shooted') || $('.user_cell').eq(good_shoot).hasClass('missed')) {
                                good_shoot = Math.floor(Math.random()*100);
                                computerChoise = good_shoot;
                                good_shoot = undefined;
                            }
                    }
                    
                    valid = true;
                    for(var i = 0; i < banUserList.length; i++){
                        if(banUserList[i] == computerChoise){
                            
                            good_shoot = undefined;
                            valid = false;
                            break;
                        }
                    }
                }   
            };//while
        };//getAvailableField
        
        
        var good_shoot = undefined;                                         //записуємо значення якщо компютер попав     
        
        function computerShooting(){                                        //функція пострілу компютером
             
             getAvailableField();
             
             banUserList.push(computerChoise);                              //додаємо постріл компютера в список пострілів
             
             if($('.user_cell').eq(computerChoise).hasClass('user_ship')){
                 $('.user_cell').eq(computerChoise).removeClass('user_ship');
                 $('.user_cell').eq(computerChoise).addClass('user_shooted');
                 
                 good_shoot = computerChoise;
                 
                 up_or_down = 2;
                 
                 if($('.user_shooted').length == 20){
                     alert('COMPUTER WIN');
                     gameOver_panel.style.display = 'block';
                     new_game.style.display = 'block';
                 }
             }else{
                 $('.user_cell').eq(computerChoise).addClass('missed');
                 if(up_or_down == 4){
                     up_or_down = 1;
                     good_shoot = undefined;
                 }
                 if(up_or_down == 3){
                     up_or_down = 4;
                 }
             }
        };
        
        
        function startGameAnimation(){
            
            $('#strat_game_animation').animate({
                "width" : 580, 
                "height" : 70,
                "marginLeft" : -240,
                "marginTop" : -35,
                "fontSize" : 60,
                "opacity" : 1
            }, 700);
            
            $('#strat_game_animation').animate({
                "opacity" : 0
            },{
                duration: 700,
                complete:function(){
                    strat_game_animation.style.display = 'none';
                }
            });
        };
                
        $('#new_game').on('click', function(){
            
            location.reload();
        });
            
            
    });