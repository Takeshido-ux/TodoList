let id = 1;
let idTask;
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
    id = id + 1;
})
$('ul').on('click', '.btnRemove', function(){
    $('#exampleModalLiveDelete').addClass('show');
    $('#exampleModalLiveDelete').css({
        "display":"block",
    });
    idTask = Number($(this).parents('li').attr('id'));
})
$('.btnRemoveModal').click(function(){
    $('#exampleModalLiveDelete').removeClass('show');
    $('#exampleModalLiveDelete').css({
        "display":"none",
    });
    let arr = `https://jsonplaceholder.typicode.com/todos/${idTask}`;
    if ($('.syncWithServer').hasClass('on')){
        $.ajax({
            url: arr,
            type: 'DELETE',
            success: function(){
                $('li')[idTask - 1].hidden = true;
            }
        })
    }
    else{
        $('li')[idTask - 1].hidden = true;
    }
})

$('ul').on('click', '.btnChange', function(){
    $('#exampleModalLive').addClass('show');
    $('#exampleModalLive').css({
        "display":"block",
    });
    idTask = Number($(this).parents('li').attr('id'));
})
$('.btnChangeModal').click(function(){
    $('#exampleModalLive').removeClass('show');
    $('#exampleModalLive').css({
        "display":"none",
    });
    let modalInpt = $('#modalInpt').val();
    let arr = `https://jsonplaceholder.typicode.com/todos/${idTask}`;
    if ($('.syncWithServer').hasClass('on')){
        $.ajax({
            url: arr,
            type: 'PUT',
            data:{
                "title": modalInpt,
            },
            success: function(){
                if (modalInpt == null){
                    return;
                }
                else if (modalInpt === ''){
                    alert('Вы не ввели текст:');
                }
                else{
                    $('li')[idTask - 1].childNodes[0].innerHTML = modalInpt;
                }
            }
        })
    }
    else{
        if (modalInpt == null){
            return;
        }
        else if (modalInpt === ''){
            alert('Вы не ввели текст:');
        }
        else{
            $('li')[idTask - 1].childNodes[0].innerHTML = modalInpt;
        }
    }
    $('#modalInpt').val('');
})
$('.btnChangeModalExit').click(function(){
    $('#exampleModalLive').removeClass('show');
    $('#exampleModalLive').css({
        "display":"none",
    });
    $('#exampleModalLiveDelete').removeClass('show');
    $('#exampleModalLiveDelete').css({
        "display":"none",
    });
})




$('.syncWithServer').click(function(){
    $('li').remove();
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
$('.btn-close').click(function(){
    $('#exampleModalLive').removeClass('show');
    $('#exampleModalLive').css({
        "display":"none",
    });
    $('#exampleModalLiveDelete').removeClass('show');
    $('#exampleModalLiveDelete').css({
        "display":"none",
    });
})

    

