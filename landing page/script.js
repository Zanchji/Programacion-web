const products = [

    {
        id: 1,
        name: "iPhone 14 Pro",
        category: "alta",
        price: 12999,
        tag: "Gama alta",
        spec: "128 GB · 6 GB RAM · 48 MP"
    },

    {
        id: 2,
        name: "Samsung Galaxy S23",
        category: "alta",
        price: 11999,
        tag: "Gama alta",
        spec: "128 GB · 8 GB RAM · 50 MP"
    },

    {
        id: 3,
        name: "Google Pixel 7",
        category: "refurbished",
        price: 6499,
        tag: "Reacondicionado",
        spec: "128 GB · 8 GB RAM · 50 MP"
    },

    {
        id: 4,
        name: "iPhone 12",
        category: "refurbished",
        price: 6999,
        tag: "Reacondicionado",
        spec: "64 GB · 4 GB RAM · 12 MP"
    },

    {
        id: 5,
        name: "Samsung Galaxy A54 5G",
        category: "economico",
        price: 7999,
        tag: "Calidad-precio",
        spec: "128 GB · 8 GB RAM · 50 MP"
    },

    {
        id: 6,
        name: "Xiaomi Redmi Note 13",
        category: "economico",
        price: 4299,
        tag: "Económico",
        spec: "256 GB · 8 GB RAM · 108 MP"
    },

    {
        id: 7,
        name: "Motorola Edge 40",
        category: "economico",
        price: 5999,
        tag: "Económico",
        spec: "256 GB · 8 GB RAM · 50 MP"
    },

    {
        id: 8,
        name: "iPhone 13",
        category: "refurbished",
        price: 7999,
        tag: "Reacondicionado",
        spec: "128 GB · 4 GB RAM · 12 MP"
    }

];


let cart = [];


const productGrid =
    document.getElementById("productGrid");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartPanel =
    document.getElementById("cartPanel");

const overlay =
    document.getElementById("overlay");

const modal =
    document.getElementById("modal");

const modalContent =
    document.getElementById("modalContent");


/* =========================
   FORMATO DE DINERO
========================= */

const money = (number) => {

    return new Intl.NumberFormat(
        "es-MX",
        {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
        }
    ).format(number);

};


/* =========================
   MOSTRAR PRODUCTOS
========================= */

function renderProducts(filter = "all") {

    const list =
        filter === "all"
            ? products
            : products.filter(
                product =>
                    product.category === filter
            );


    productGrid.innerHTML =
        list.map(product => {

            return `

                <article class="product-card">

                    <div class="product-img">
                        📱
                    </div>

                    <div class="product-body">

                        <span class="product-tag">
                            ${product.tag.toUpperCase()}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${product.spec}
                        </p>

                        <div class="product-price">

                            <strong>
                                ${money(product.price)}
                            </strong>

                            <button
                                class="small-btn add-product"
                                data-id="${product.id}">

                                Agregar

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================
   AGREGAR AL CARRITO
========================= */

function addToCart(id) {

    const product =
        products.find(
            product =>
                product.id === Number(id)
        );


    if (!product) {
        return;
    }


    cart.push(product);

    updateCart();

    openCart();

}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function updateCart() {

    cartCount.textContent =
        cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty">
                Tu carrito está vacío.
            </p>

        `;

    } else {

        cartItems.innerHTML =
            cart.map((product, index) => {

                return `

                    <div class="cart-row">

                        <div>

                            <b>
                                ${product.name}
                            </b>

                            <br>

                            <small>
                                ${money(product.price)}
                            </small>

                        </div>


                        <button
                            class="remove"
                            data-index="${index}">

                            Eliminar

                        </button>

                    </div>

                `;

            }).join("");

    }


    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    cartTotal.textContent =
        money(total);

}


/* =========================
   ABRIR / CERRAR CARRITO
========================= */

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("open");

}


function closeCart() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("open");

}


/* =========================
   EVENTOS GENERALES
========================= */

document.addEventListener("click", (event) => {


    /* AGREGAR PRODUCTO */

    const addProduct =
        event.target.closest(".add-product");


    if (addProduct) {

        addToCart(
            addProduct.dataset.id
        );

    }


    /* AGREGAR PRODUCTO DESTACADO */

    const heroAdd =
        event.target.closest(".add-cart");


    if (heroAdd) {

        cart.push({

            name: heroAdd.dataset.name,

            price: Number(
                heroAdd.dataset.price
            )

        });

        updateCart();

        openCart();

    }


    /* ELIMINAR PRODUCTO */

    const remove =
        event.target.closest(".remove");


    if (remove) {

        cart.splice(
            Number(remove.dataset.index),
            1
        );

        updateCart();

    }


    /* FILTROS */

    const filter =
        event.target.closest("[data-filter]");


    if (
        filter &&
        (
            filter.classList.contains("filter") ||
            filter.classList.contains("category-card")
        )
    ) {

        const value =
            filter.dataset.filter;


        renderProducts(value);


        document
            .querySelectorAll(".filter")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === value
                );

            });


        if (
            filter.classList.contains(
                "category-card"
            )
        ) {

            document
                .querySelector(
                    ".products-section"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }


    /* INFORMACION */

    const info =
        event.target.closest("[data-open]");


    if (info) {

        openInfo(
            info.dataset.open
        );

    }

});


/* =========================
   BOTON CARRITO
========================= */

document
    .getElementById("cartBtn")
    .onclick = openCart;


document
    .getElementById("closeCart")
    .onclick = closeCart;


overlay.onclick = closeCart;


/* =========================
   MENU MOVIL
========================= */

document
    .getElementById("menuBtn")
    .onclick = () => {

        document
            .getElementById("mainNav")
            .classList.toggle("open");

    };


/* =========================
   BUSCADOR
========================= */

document
    .getElementById("searchBtn")
    .onclick = () => {

        openModal(`

            <h2>
                Buscar celulares
            </h2>

            <p>
                Escribe el modelo que estás buscando.
            </p>

            <div class="search-box">

                <input
                    id="searchInput"
                    placeholder="Ej. iPhone 13">

                <button
                    class="btn primary"
                    id="doSearch">

                    Buscar

                </button>

            </div>

            <div id="searchResults"></div>

        `);


        setTimeout(() => {

            document
                .getElementById("doSearch")
                .onclick = () => {

                    const query =
                        document
                            .getElementById(
                                "searchInput"
                            )
                            .value
                            .toLowerCase();


                    const results =
                        products.filter(
                            product =>
                                product.name
                                    .toLowerCase()
                                    .includes(query)
                        );


                    document
                        .getElementById(
                            "searchResults"
                        )
                        .innerHTML =

                        results.length

                            ? results.map(product => `

                                <p>
                                    <b>
                                        ${product.name}
                                    </b>

                                    —
                                    ${money(product.price)}
                                </p>

                            `).join("")

                            : `

                                <p>
                                    No encontramos ese modelo.
                                </p>

                            `;

                };

        }, 0);

    };


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .onclick = () => {


        if (cart.length === 0) {

            alert(
                "Agrega un celular al carrito antes de continuar."
            );

            return;

        }


        const total =
            cart.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );


        openModal(`

            <h2>
                Pago seguro
            </h2>

            <p>
                Total a pagar:
                <b>${money(total)}</b>
            </p>


            <form
                class="payment-form"
                id="paymentForm">

                <input
                    required
                    placeholder="Nombre del titular">


                <input
                    required
                    inputmode="numeric"
                    maxlength="19"
                    placeholder="Número de tarjeta">


                <div class="row">

                    <input
                        required
                        placeholder="MM/AA">


                    <input
                        required
                        placeholder="CVV"
                        maxlength="4">

                </div>


                <button
                    class="btn primary full">

                    Pagar ${money(total)}

                </button>

            </form>


            <p>
                🔒 Demo visual.
                Para cobros reales conecta
                Stripe, Mercado Pago u otro proveedor.
            </p>

        `);


        setTimeout(() => {

            document
                .getElementById("paymentForm")
                .onsubmit = (event) => {

                    event.preventDefault();


                    openModal(`

                        <h2>
                            ¡Pedido recibido!
                        </h2>

                        <p>
                            Esta es una demostración
                            del checkout.
                        </p>

                        <p>
                            Para producción,
                            el pago debe procesarse
                            mediante un proveedor seguro.
                        </p>


                        <button
                            class="btn primary full"
                            onclick="closeModal()">

                            Cerrar

                        </button>

                    `);

                };

        }, 0);

    };


/* =========================
   MODAL
========================= */

function openModal(content) {

    modalContent.innerHTML =
        content;

    modal.classList.add("open");

}


function closeModal() {

    modal.classList.remove("open");

}


document
    .getElementById("modalClose")
    .onclick = closeModal;


modal.addEventListener(
    "click",
    (event) => {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* =========================
   INFORMACION
========================= */

function openInfo(type) {

    const data = {

        returns: [

            "Política de devoluciones",

            "Tienes 15 días naturales para solicitar una devolución. El equipo debe conservar su empaque original, accesorios y encontrarse en condiciones adecuadas. Las condiciones finales deben definirse en los términos oficiales de la tienda."

        ],


        payment: [

            "Métodos de pago",

            "Aceptamos tarjetas de crédito y débito. En producción puedes integrar Stripe, Mercado Pago, PayPal u otro procesador. Nunca almacenes directamente los datos completos de las tarjetas en tu servidor."

        ],


        shipping: [

            "Envíos",

            "Realizamos envíos a todo México. El tiempo estimado mostrado en esta demo es de 2 a 5 días hábiles. Para una tienda real agrega costo, cobertura, paquetería y número de guía."

        ]

    };


    openModal(`

        <h2>
            ${data[type][0]}
        </h2>

        <p>
            ${data[type][1]}
        </p>

    `);

}


/* =========================
   ENVÍO DE FORMULARIO (FORMSPREE / AJAX)
========================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const contacto = document.getElementById("contactoInput")?.value.trim();
        const mensaje = document.getElementById("mensaje")?.value.trim();

        if (!nombre || !email || !contacto || !mensaje) {
            showFormStatus("Por favor, llena todos los campos obligatorios.", "error");
            return;
        }

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalBtnText = submitBtn ? submitBtn.innerText : "Enviar";

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Enviando...";
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method || "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                showFormStatus("¡Gracias! Tu mensaje ha sido enviado exitosamente.", "success");
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, "errors")) {
                    showFormStatus(data.errors.map(error => error.message).join(", "), "error");
                } else {
                    showFormStatus("Ocurrió un error al enviar el mensaje. Inténtalo más tarde.", "error");
                }
            }
        } catch (error) {
            showFormStatus("Error de conexión. Verifica tu internet e inténtalo de nuevo.", "error");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        }
    });
}

function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = "block";

    setTimeout(() => {
        formStatus.style.display = "none";
    }, 5000);
}


/* =========================
   INICIAR
========================= */

renderProducts();

updateCart();