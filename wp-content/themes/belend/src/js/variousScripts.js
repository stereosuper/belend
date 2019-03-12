jQuery(document).ready(function($){

    var adminAjax = scripts_l10n.adminAjax;

    $('.field-siren input').on('change', function(){
        //console.log(change);
    });

    $('.field-siren input').autocomplete({
        source : function(request, response){
            $.ajax({
                url: adminAjax,
                data: {
                    action: 'getSiren',
                    'name_startsWith' : $('.field-siren input').val()
                },
                success : function(data){
                    //console.log(data);
                    response($.map(JSON.parse(data), function(company){
                        var label = company.siren;
                        return {'NAF':company.codeNaf,'label':company.name + ', ' + company.address + ', ' + 'SIREN: ' + company.siren, 'value':company.siren} // on retourne cette forme de suggestion
                    }));			}
            });
        },
        search: function(term) {
            // custom minLength
            if ( term.length < 2 ) {
                return false;
            }
        },
        select : function(event, ui){
            //console.log(ui.item);
            $('.field-naf input').val(ui.item.NAF);
        }
    });

    /*	$(document).on('click','.gform_next_button', function(){
            var form_content = $('#gform_1').serialize()
            console.log(form_content);
            localStorage.setItem('belendForm', form_content);
        });*/


    // Mettre en forme et compiler
    $(document).on('gform_post_render', function(){
        var cookie = getCookie('gformPartialID');
        if( typeof cookie == "undefined" || ($('.partial_entry_id').val() != 'pending' && $('.partial_entry_id').val() !='undefined')){

            if( $('.partial_entry_id').val() != cookie){
                //console.log('added to cookie:', $('.partial_entry_id').val())
                document.cookie = "gformPartialID="+$('.partial_entry_id').val();
            }

        }else if(cookie && $('#partial_entry_id').val() != cookie){
            $('.partial_entry_id').val(cookie);
        }
    });

});

// Mettre en forme et compiler
function getCookie(c_name) {
    var c_value = document.cookie,
        c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}