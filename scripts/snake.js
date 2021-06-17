var snake = (_ => {
    let _snake = new Array();
    let _field;

    let _speed = 200;
    let _dimension = { width: 50, height: 20 };
    let _direction = { current: 'D', next: 'D' };
    
    let _createField = () => {
        for (let h = 1; h <= _dimension.height; h++) {
            $('#snakeTable tbody').append('<tr></tr>');

            for (let w = 1; w <= _dimension.width; w++)
                $('#snakeTable tbody tr:last-child').append(`<td>${(h - 1) * 50 + w - 1}</td>`);
        }
    };
   
    let _initSnake = _ => {
        _field = $('#snakeTable tbody tr td');

        _snake[0] = { position: 0, class: 'tail' };
        _snake[1] = { position: 1, class: 'body' };
        _snake[2] = { position: 2, class: 'head' };

        $(_field[0]).addClass('tail');
        $(_field[1]).addClass('body');
        $(_field[2]).addClass('head');
    };

    let _addComands = _ => {
        $('body').on('keydown', (event) => {
            switch (event.keyCode) {
                case 87: _direction.next = _direction.current == 'S' ? 'S' : 'W'; break;
                case 68: _direction.next = _direction.current == 'A' ? 'A' : 'D'; break;
                case 83: _direction.next = _direction.current == 'W' ? 'W' : 'S'; break;
                case 65: _direction.next = _direction.current == 'D' ? 'D' : 'A'; break;
                default: return;
            }
        });
    };

    let _move = _ => {
        for (let s = 0; s < _snake.length; s++) {
            if (_snake[s].class === 'head') {
                switch (_direction.current = _direction.next) {
                    case 'W': {
                        let nexPosition = _snake[s].position - _dimension.width;
                        _snake[s].position = nexPosition < 0 
                            ? _dimension.width * (_dimension.height - 1) + _snake[s].position  
                            : nexPosition; break;   
                    }
                    case 'D': {
                        let nextPosition = _snake[s].position + 1;
                        _snake[s].position = nextPosition % _dimension.width == 0 
                            ? nextPosition - _dimension.width 
                            : nextPosition; break;
                    }
                    case 'S': {
                        let nextPosition = _snake[s].position + _dimension.width
                        _snake[s].position = nextPosition >= _dimension.width * _dimension.height 
                            ? _snake[s].position - _dimension.width * (_dimension.height - 1)
                            : nextPosition; break;
                    } 
                    case 'A':{
                        let nextPosition = _snake[s].position - 1;
                        _snake[s].position = _snake[s].position % _dimension.width == 0 
                            ? nextPosition + _dimension.width  
                            : nextPosition; break;
                    }
                    default: return;
                } 
                return;
            }

            _snake[s].position = _snake[s + 1].position;
        }
    };

    let _showSnake = () => {
        setInterval(_ => {
            _move();
        
            $(_field).removeClass();
            _snake.forEach(snake => {
                $(_field[snake.position]).addClass(snake.class);
            });
        }, _speed)
    }

    return {
        init: _ => {
            _createField();
            _initSnake();

            _showSnake();
            _addComands();
        }
    }
})();

( _ => { snake.init(); } )();
