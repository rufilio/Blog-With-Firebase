import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDqFEJQqObbjZRKc-c-yi-WC-cJ8SZV3VQ",
    authDomain: "bliss-db-bd5b3.firebaseapp.com",
    databaseURL: "https://bliss-db-bd5b3-default-rtdb.firebaseio.com",
    projectId: "bliss-db-bd5b3",
    storageBucket: "bliss-db-bd5b3.appspot.com",
    messagingSenderId: "836713405203",
    appId: "1:836713405203:web:4d04ad5fa029af6a0558e6",
    measurementId: "G-HWYX1FDJZG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const blogsRef = collection(db, "blogs");
const helpsRef = collection(db, "help_section");
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

getDocs(blogsRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.id === blogId) {
            const data = doc.data();
            const images = data.image;
            const titulo = data.title;
            const info = data.info.replace(/\./g, '.<br><br>');
            
            const authorName = data.author;
            const fecha = data.date;

            

            const fechaJS = fecha.toDate();

            const fechaFormateada = fechaJS.toLocaleDateString();

            const blogHTML = `
            <title>${titulo}</title>
            <img
                src="${images}">
            <div class="text-post">
                <h1>${titulo}</h1>
                <p>
                   ${info}
                </p>
            </div>
            `;

            document.getElementById("detalles").innerHTML = blogHTML;
        }
    });
}).catch((error) => {
    console.log("Error obteniendo blogs: ", error);
});

getDocs(helpsRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const title = data.title;
            const info = data.intruct;
            var textoFormateado = info.replace(/\/st\//g, "<br>");

            const helpHTML = `
        <div class="faq">
          <button class="accordion">
            ${title}
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="pannel">
            <p>
              ${textoFormateado}
            </p>
          </div>
        </div>
      `;

            document.getElementById("FAQ").innerHTML += helpHTML;
        });
    })
    .catch((error) => {
        console.log("Error al cargar las sección de ayuda: ", error);
    });

// Agregamos el evento de clic al elemento padre
document.addEventListener("click", function (event) {
    // Verificamos si el clic ocurrió en un botón con la clase "accordion"
    if (event.target.classList.contains("accordion")) {
        // Cambiamos las clases y mostramos u ocultamos el panel correspondiente
        event.target.classList.toggle("active");
        event.target.parentElement.classList.toggle("active");

        var pannel = event.target.nextElementSibling;

        if (pannel.style.display === "block") {
            pannel.style.display = "none";
        } else {
            pannel.style.display = "block";
        }
    }
});



getDocs(blogsRef).then((querySnapshot) => {
    let count = 0; // Contador para seguir la cantidad de elementos cargados
    querySnapshot.forEach((doc) => {
        if (count < 4) { // Verifica si se han cargado menos de 4 elementos
            const data = doc.data();
            const images = data.image;
            const titulo = data.title;
            const info = data.info;
            const authorName = data.author;
            const fecha = data.date;

            const fechaJS = fecha.toDate();
            const fechaFormateada = fechaJS.toLocaleDateString();

            const blogHTML = `
                <div class="blog-box">
                    <div class="blog-box-img">
                        <img src="${images}">
                        <a href="post.html?id=${doc.id}" class="blog-img-link">
                            <i class="bx bx-right-top-arrow-circle"></i>
                        </a>
                    </div>
                    <div class="blog-box-text">
                        <a>${titulo}</a>
                        <p>${info}</p>
                        <div class="blog-author">
                            <div class="blog-author-img">
                                <i class="bx bx-user"></i>
                            </div>
                            <div class="blog-author-text">
                                <strong>${authorName}</strong>
                                <span>${fechaFormateada}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("blog-section").innerHTML += blogHTML;
            count++; // Incrementa el contador después de cargar un elemento
        } else {
            return; // Detiene la iteración si ya se han cargado 4 elementos
        }
    });
}).catch((error) => {
    console.log("Error obteniendo blogs: ", error);
});

getDocs(blogsRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const images = data.image;
        const titulo = data.title;
        const info = data.info;
        const authorName = data.author;
        const fecha = data.date;

        const fechaJS = fecha.toDate();

        const fechaFormateada = fechaJS.toLocaleDateString();



        const blogHTML = `
                <div class="blog-box">
                    <div class="blog-box-img">
                        <img src="${images}">
                        <a href="post.html?id=${doc.id}" class="blog-img-link">
                            <i class="bx bx-right-top-arrow-circle"></i>
                        </a>
                    </div>
                    <div class="blog-box-text">
                        <a>${titulo}</a>
                        <p>${info}</p>
                        <div class="blog-author">
                            <div class="blog-author-img">
                                <i class="bx bx-user"></i>
                            </div>
                            <div class="blog-author-text">
                                <strong>${authorName}</strong>
                                <span>${fechaFormateada}</span>
                            </div>
                        </div>
                    </div>
                </div>
        `;

        document.getElementById("blog-panel").innerHTML += blogHTML;

    });
}).catch((error) => {
    console.log("Error obteniendo blogs: ", error);
})

const submit = document.getElementById('submit');
const submitLogin = document.getElementById('submitLogin');

submit.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Crendo cuenta...')
            window.location.href = "/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

})

submitLogin.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById('gmailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Iniciando Sesión...')
            window.location.href = "/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

})

