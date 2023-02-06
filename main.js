const $ = (element) => {
  return document.querySelector(element);
}

window.addEventListener("load", () => {
  // e.preventDefault();
  /* modal */
  const $btnModal = $("#btnModal");
  const $containModal = $(".contain-modal");
  const $btnClose = $("#btnClose");


  /* dark */
  const $sun = $("#sun");
  const $body = $("body");

  /* expresiones regulares */
  const regExAlpha = /^[A-Za-z0-9\s]+$/;
  /* form */
  const $form = $("#form-text");
  const $formErrors = $("#formErrors")

  /* input */
  const $input = $("#input");
  const $inputErrors = $("#inputErrors");
  /* estado */
  const $state = $("#state");
  const $stateErrors = $("#stateErrors");

  /* proceso */
  const $taskContiner = $("#task-continer");
  const $progresoContenedor = $("#progresoContenedor");
  const $doneContiner = $(".done-continer");
  const $listaTarea = $("#lista-tarea");
  const $listaProgreso = $("#lista-progreso");
  const $listaTerminado = $("#lista-terminado");

  /* modal cambio de contenedor */
  const $modalChangeContiner = $(".modal-change-continer");
  const $changeForm = $(".change-form")
  const $change = $("#change");


  /* modal editar */
  const $modalEditContiner = $(".modal-edit-continer");
  const $formEdit2 = $("#form-edit2");
  const $input2 = $("#input2")
  const $state2 = $("#state2");
  const $btnEdit = $(".btn-edit");
  const $IdParaCambiar = $("#IdParaCambiar");

  let tareas = [
  ]

  $btnModal.addEventListener("click", (event) => {
      event.preventDefault();
      $containModal.classList.add("show-modal");
  })

  $btnClose.addEventListener("click", (event) => {
      event.preventDefault();
      $containModal.classList.remove("show-modal");
  })

  $sun.addEventListener("click", (e) => {
      $body.classList.toggle("dark");
      if ($body.classList.contains("dark")) {
          $body.innerHTML = (`<i class="ri-moon-clear-fill"></i>`);
      }
  })

  $form.addEventListener("submit", e => {
      e.preventDefault();
      setTarea(e);
  })

  let validacionErrors = false
  $input.addEventListener("blur", () => {
      if (!$input.value.trim()) {
          $inputErrors.innerText = "Ingrese un Titulo";
          $inputErrors.style.color = "red";
          validacionErrors = true;
      } else if (!regExAlpha.test($input.value)) {
          $inputErrors.innerText = "El titulo no es valido";
          validacionErrors = true;
      }
  })

  const setTarea = e => {
      let errors = false
      if ($input.value.length <= 5) {
          $inputErrors.innerText = "Es inválido o está vacio";
          $inputErrors.style.color = "red";
          $inputErrors.style.marginLeft = "1em";
          errors = true;
          return;
      } else {
          $inputErrors.innerText = "";
      }

      if ($state.value == "") {
          $stateErrors.innerText = "seleccionar un estado";
          $stateErrors.style.color = "red";
          $stateErrors.style.marginLeft = "1em";
          errors = true;
          return
      } else {
          $stateErrors.innerText = "";
      }

      tareas.push({ id: uuid.v1(), texto: $input.value, estado: $state.value });

      $form.reset();
      $input.focus();
      pintarTareas();

      $changeForm.addEventListener("submit", (event) => {
          event.preventDefault();
          let valor = tareas.filter(tarea => tarea.id == $IdParaCambiar.id);
          valor[0].estado = Number($change.value);
          $modalChangeContiner.classList.toggle("show-modal-change-continer");
          pintarTareas();
      });
      $formEdit2.addEventListener("submit", (event) => {
          event.preventDefault();
          let valor = tareas.filter(tarea => tarea.id == $IdParaCambiar.id);
          valor[0].estado = Number($state2.value);
          valor[0].texto = $input2.value;
          $modalChangeContiner.classList.toggle("show-modal-change-continer");
          pintarTareas();
      });
  }

  const pintarTareas = () => {
      $listaTarea.innerHTML = "";
      $listaProgreso.innerHTML = "";
      $listaTerminado.innerHTML = "";

      let pendiente = tareas.filter(tarea => tarea.estado == 1);
      pendiente.forEach(tarea => {
          $listaTarea.innerHTML +=
              `<div class="contenedor-tarea"><div><p>${tarea.texto}</p></div>
           <div class="image"><button class="btn-edit-icon"><i class="ri-pencil-fill" id=${tarea.id}></i></button>
           <button class="btn-check"><i class="ri-checkbox-circle-fill" id=${tarea.id}></i></button>
           <button class="btn-delete"><i class="ri-delete-bin-2-fill" id=${tarea.id}></i></button></div>`
      });

      let progreso = tareas.filter(tarea => tarea.estado == 2);
      progreso.forEach(tarea => {
          $listaProgreso.innerHTML +=

              `<div class="contenedor-progreso"><div><p>${tarea.texto}</p></div>
            <div class="image"><button class="btn-edit-icon"><i class="ri-pencil-fill" id=${tarea.id}></i></button>
            <button class="btn-check" class="btn-check"><i class="ri-checkbox-circle-fill" id=${tarea.id}></i></button>
            <button class="btn-delete"><i class="ri-delete-bin-2-fill" id=${tarea.id}></i></button></div>`
      });

      let terminado = tareas.filter(tarea => tarea.estado == 3);
      terminado.forEach(tarea => {
          $listaTerminado.innerHTML +=
              `<div class="contenedor-terminado"><div><p>${tarea.texto}</p></div>
            <div class="image"><button class="btn-delete"><i class="ri-delete-bin-2-fill" id=${tarea.id}></i></button></div>`
      });
      EventoBtn();
  };

  const EventoBtn = () => {
      const $btnDelete = document.querySelectorAll(".btn-delete");
      const $btnCheck = document.querySelectorAll(".btn-check");
      const $btnEditIcon = document.querySelectorAll(".btn-edit-icon");

      $btnDelete.forEach(button => {
          button.addEventListener("click", (e) => {
              e.preventDefault();
              tareas = tareas.filter(tarea => e.target.id !== tarea.id);
              pintarTareas();
          });
      });

      $btnCheck.forEach(button => {
          button.addEventListener("click", (event) => {
              event.preventDefault();
              $changeForm.reset();
              $IdParaCambiar.id = event.target.id;
              $modalChangeContiner.classList.add("show-modal-change-continer");
          });
          $modalChangeContiner.classList.remove("show-modal-change-continer");
      });

      $btnEditIcon.forEach(button => {
          button.addEventListener("click", (e) => {
              e.preventDefault();
              $formEdit2.reset();
              $IdParaCambiar.id = e.target.id;
              $modalEditContiner.classList.add("show-modal-edit-continer");
          });
          $modalEditContiner.classList.remove("show-modal-edit-continer");
      });
  };
});