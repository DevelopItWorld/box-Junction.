// Navbar toggle
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
if (mobileToggle) {
  mobileToggle.addEventListener("click", ()=>{ navMenu.classList.toggle("active"); });
}
// WhatsApp Order Form
const deliveryDateInput = document.getElementById('deliveryDate');
if (deliveryDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'block';

        const formData = new FormData(this);
        const orderDetails = Object.fromEntries(formData.entries());

        const message = formatWhatsAppMessage(orderDetails);
        const WHATSAPP_NUMBER = "919717382543";
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            if (loadingEl) loadingEl.style.display = 'none';
            window.open(whatsappURL, '_blank');
            this.reset();
        }, 1500);
    });
}

function formatWhatsAppMessage(orderDetails) {
    const boxTypeNames = {
        birthday: 'Birthday Special Box',
        wedding: 'Wedding Celebration Box',
        festival: 'Festival Delights Box',
        romance: 'Love & Romance Box',
        achievement: 'Achievement Box',
        babyshower: 'Baby Shower Box',
        custom: 'Custom Box'
    };

    const sizeNames = {
        small: 'Small (₹549-₹699)',
        medium: 'Medium (₹799-₹999)',
        large: 'Large (₹1199-₹1599)',
        premium: 'Premium (₹1799-₹2499)'
    };

    const timeSlots = {
        morning: 'Morning (9 AM - 12 PM)',
        afternoon: 'Afternoon (12 PM - 4 PM)',
        evening: 'Evening (4 PM - 8 PM)'
    };

    return `
🍬 *NEW ORDER - BOX JUNCTION* 🍬

👤 *Customer Details:*
Name: ${orderDetails.firstName || "Not provided"} ${orderDetails.lastName || ""}
Phone: ${orderDetails.phone || "Not provided"}
${orderDetails.email ? `Email: ${orderDetails.email}` : ""}

📦 *Order Details:*
Box Type: ${boxTypeNames[orderDetails.boxType] || "Not specified"}
Box Size: ${sizeNames[orderDetails.boxSize] || "Not specified"}
Quantity: ${orderDetails.quantity || "1"}
Delivery Date: ${orderDetails.deliveryDate || "Not specified"}
Time Slot: ${timeSlots[orderDetails.deliveryTime] || "Any time"}

📍 *Delivery Address:*
${orderDetails.address || "Not specified"}

📝 *Special Requests:*
${orderDetails.specialRequests || "None"}
    `;
}
// Navigation Menu Toggle
// const mobileMenuToggle = document.getElementById('mobileMenuToggle');
// const navMenu = document.getElementById('navMenu');
// if (mobileMenuToggle && navMenu) {
//     mobileMenuToggle.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//     });
// }

