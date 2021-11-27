let id = 201;
$('#addBtn').click(function(){
    let textInpt = $('#textInpt').val();
    if ($('.syncWithServer').hasClass('on')){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            type: 'POST',
            data:{ 
                "title": `${textInpt}`,
            }
        })
    }
    if (textInpt){
        $('ul').append('<li id="'+ id +'" class="list-group-item task align-items-center justify-content-between"><p>'+ textInpt +'</p><div><button class="btn btn-sm btn-icon btn-secondary btnChange" type="button"><i class="fa fa-pencil-alt"></i> <span class="sr-only">Edit</span></button><button class="btn btn-sm btn-icon btn-secondary btnRemove" type="button"><i class="far fa-trash-alt"></i> <span class="sr-only">Remove</span></button></div></li>')
    }
    else{
        alert('Введите текст')
    }
    $('#textInpt').val('');
    console.log(id);
    id = id + 1;
})
$('ul').on('click', '.btnRemove', function(){
    let delText = confirm('Вы уверены ?');
    let idTask = $(this).parents('li').attr('id');
    let arr = `https://jsonplaceholder.typicode.com/todos/${idTask}`;
    if(delText == false){
        return;
    }
    else{
        $(this).parents('li').remove();;
    }
    if ($('.syncWithServer').hasClass('on')){
        $.ajax({
            url: arr,
            type: 'DELETE',
        })
    }
})

$('ul').on('click', '.btnChange', function(){
    let changeText = prompt('Введите текст:');
    let idTask = $(this).parents('li').attr('id');
    let arr = `https://jsonplaceholder.typicode.com/todos/${idTask}`;
    if (changeText == null){
        return;
    }
    else if (changeText === ''){
        alert('Вы не ввели текст:');
    }
    else{
        $(this).parents('li').find('p').text(changeText);
    }
    if ($('.syncWithServer').hasClass('on')){
        $.ajax({
            url: arr,
            type: 'PUT',
            data:{
                "title": changeText,
            }
        })
    }
})




$('.syncWithServer').click(function(){
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/',
        type: 'GET',
        success: function(data){
            data.length = data.length / 4;
            $.each( data , function(item){
                $('ul').append('<li id="'+ data[item].id +'" class="list-group-item task align-items-center justify-content-between"><p>'+ data[item].title +'</p><div><button class="btn btn-sm btn-icon btn-secondary btnChange" type="button"><i class="fa fa-pencil-alt"></i> <span class="sr-only">Edit</span></button><button class="btn btn-sm btn-icon btn-secondary btnRemove" type="button"><i class="fa fa-trash-alt"></i> <span class="sr-only">Remove</span></button></div></li>');
                $('.syncWithServer').addClass('on');
            })
        }
    })
})

    

