<!-- Сайт розроблено студентом Агілов Петро Олександрович, група ФІТ-2-11 -->
const services = [
  { id: 1, name: "Комплексна мийка", price: 350 },
  { id: 2, name: "Хімчистка салону", price: 800 },
  { id: 3, name: "Полірування кузова", price: 1200 },
  { id: 4, name: "Заміна мастила", price: 600 }
];

const timeSlots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];


const servicesDiv = document.getElementById("services");
services.forEach(s => {
  const card = document.createElement("div");
  card.className = "service-card";
  card.dataset.id = s.id;
  card.textContent = `${s.name} — ${s.price} грн`;
  servicesDiv.appendChild(card);
});

let chosenService = null;
let chosenSlot = null;


servicesDiv.addEventListener("click", e => {
  if (!e.target.classList.contains("service-card")) return;
  [...servicesDiv.children].forEach(c => c.style.background = "");
  e.target.style.background = "#bbdefb";

  chosenService = services.find(s => s.id === +e.target.dataset.id);
  renderSlots();
  validateForm();
});


function renderSlots() {
  const slotsDiv = document.getElementById("slots");
  const title = document.getElementById("slotsTitle");
  slotsDiv.innerHTML = "";
  title.style.display = "block";

  timeSlots.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "slot-btn";
    btn.textContent = t;
    slotsDiv.appendChild(btn);
  });
  chosenSlot = null;
}


document.getElementById("slots").addEventListener("click", e => {
  if (!e.target.classList.contains("slot-btn") || e.target.classList.contains("booked")) return;
  [...e.currentTarget.children].forEach(b => b.style.background = "");
  e.target.style.background = "#bbdefb";
  chosenSlot = e.target.textContent;
  validateForm();
});


function validateForm() {
  document.getElementById("bookBtn").disabled = !(chosenService && chosenSlot);
}


document.getElementById("bookBtn").addEventListener("click", () => {
  if (!(chosenService && chosenSlot)) return;

  document.getElementById("confirm").textContent =
    `✅ Ви забронювали «${chosenService.name}» на ${chosenSlot}. Дякуємо!`;


  document.querySelectorAll(".slot-btn").forEach(btn => {
    if (btn.textContent === chosenSlot) {
      btn.classList.add("booked");
      btn.style.background = "#bdbdbd";
    }
  });

  chosenSlot = null;
  validateForm();
});
