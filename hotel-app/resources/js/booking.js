/**
 * Kinga Resorts - Booking Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const guestSelect = document.getElementById('guestCount');
    const roomCards = document.querySelectorAll('.room-select-card');
    const selectButtons = document.querySelectorAll('.select-room-btn');
    const confirmBtn = document.getElementById('confirmBookingBtn');

    // Summary Elements
    const sCheckIn = document.getElementById('summaryCheckIn');
    const sCheckOut = document.getElementById('summaryCheckOut');
    const sNights = document.getElementById('summaryNights');
    const sRoom = document.getElementById('summaryRoom');
    const sRate = document.getElementById('summaryRate');
    const sTaxes = document.getElementById('summaryTaxes');
    const sTotal = document.getElementById('summaryTotal');

    // State
    let state = {
        checkIn: null,
        checkOut: null,
        nights: 0,
        selectedRoom: null,
        roomPrice: 0,
        guests: 2
    };

    // Initialize Dates
    const initDates = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        checkInInput.min = today.toISOString().split('T')[0];
        checkInInput.valueAsDate = today;

        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        checkOutInput.valueAsDate = tomorrow;

        updateDateState();
    };

    // Update Date State
    const updateDateState = () => {
        state.checkIn = new Date(checkInInput.value);
        state.checkOut = new Date(checkOutInput.value);

        // Calculate nights
        const diffTime = Math.abs(state.checkOut - state.checkIn);
        state.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (state.nights < 1) state.nights = 0;

        // Update UI
        sCheckIn.textContent = state.checkIn.toLocaleDateString();
        sCheckOut.textContent = state.checkOut.toLocaleDateString();
        sNights.textContent = state.nights;

        // Validate Check-out is after Check-in
        if (state.checkIn >= state.checkOut) {
            checkOutInput.setCustomValidity('Check-out must be after check-in');
        } else {
            checkOutInput.setCustomValidity('');
        }

        updateTotals();
    };

    // Handle Room Selection
    const handleRoomSelect = (card, btn) => {
        // Deselect others
        roomCards.forEach(c => c.classList.remove('selected'));
        selectButtons.forEach(b => {
            b.textContent = 'Select Room';
            b.classList.remove('btn-primary-gold', 'text-white');
            b.classList.add('btn-outline-gold');
        });

        // Select current
        card.classList.add('selected');

        if (btn) {
            btn.textContent = 'Selected';
            btn.classList.remove('btn-outline-gold');
            btn.classList.add('btn-primary-gold', 'text-white');
        }

        // Update State
        state.selectedRoom = card.querySelector('.card-title').textContent;
        state.roomId = card.dataset.roomId;
        state.roomPrice = parseInt(card.dataset.price);

        // Update Hidden Input
        document.getElementById('selectedRoomInput').value = state.roomId;

        // Update UI
        sRoom.textContent = state.selectedRoom;

        // Scroll to next step (optional)
        document.getElementById('step3').scrollIntoView({ behavior: 'smooth' });

        updateTotals();
    };    // Handle Confirm - Allow form submission
    // confirmBtn.addEventListener('click', () => { ... });

    // Sub-feature: Pre-select from URL params
    const params = new URLSearchParams(window.location.search);
    const roomIdParam = params.get('room_id');
    if (roomIdParam) {
        const targetCard = document.querySelector(`.room-select-card[data-room-id="${roomIdParam}"]`);
        if (targetCard) {
            const btn = targetCard.querySelector('.select-room-btn');
            handleRoomSelect(targetCard, btn);
        }
    }

    // Initialize
    initDates();
});
