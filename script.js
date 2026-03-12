$(document).ready( () => {
  
  const inpts = document.querySelectorAll('input')
  
  const delElm = (elem) => $(elem).css('display', 'none')
  
  const flexElm = (elem) => $(elem).css('display', 'flex')
  
  const addErr = (elem) => $(elem).addClass('border-danger-subtle')
  
  const delErr = (elem) => $(elem).removeClass('border-danger-subtle')
  
  const lSgI = ( item ) => {
    const value = localStorage.getItem( item )
    return value
  }
  
  const chngTxt = (elem, txt) => {
    $(elem).text(txt)
  }
  
  
  const addAlert = (msg, type) => {
    const alertDiv = $('.wrng')
    
    $( alertDiv ).text('')
    
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${msg}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
      ].join('')
      
      alertDiv.append(wrapper)
  }
  
  inpts.forEach((inpt) => {
    $(inpt).on('keyup', function() {
      if (this.value) {
        delErr(inpt)
      }
    })
  })
  
  const loginVal = () => {
    
    const loginId = document.querySelector('.email').value,
    pass = document.querySelector('.password').value,
    inpts = document.querySelectorAll('form input'),
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if ( !loginId || !pass) {
      inpts.forEach( (inpt) => {
        if (!inpt.value) {
          addAlert('No dejes campos vacíos', 'danger')
          addErr(inpt)
          return false
        } else {
          delErr(inpt)
        }
      })
    } else {
      $(inpts).removeClass('border-danger')
      if (!emailRegex.test(loginId)) {
        addAlert('Ingresa un correo válido', 'danger')
        addErr('.email')
        return false
      }
      if ( pass.length < 6 ) {
        addAlert('La contraseña debe tener más de 6 dígitos', 'danger')
        addErr('.password')
        return false
      }
      addAlert('Iniciando sesión...', 'success')
     // return [ true, loginId, pass ]
      document.querySelector('form').submit()
      
    }
    
    //alert(`correo: \n${loginId} \npass: \n${pass}`)
  }
  
  $('.contLI').click( () => {
    loginVal()
  })
  
  $('.cancLI').click( () => {
    location.href = '/'
  })
  
  //const url = location.href
  //if (url.includes('admin')) {
  //  document.querySelector('header').style = //'display: none'
  //  $('.main').addClass('mainAdm')
 // //$('.logoA').attr('href', '#')
 // }
  
})
