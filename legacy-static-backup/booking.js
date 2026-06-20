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
        state.roomPrice = parseInt(card.dataset.price);

        // Update UI
        sRoom.textContent = state.selectedRoom;

        // Scroll to next step (optional)
        document.getElementById('step3').scrollIntoView({ behavior: 'smooth' });

        updateTotals();
    };

    // Update Financial Totals
    const updateTotals = () => {
        if (!state.selectedRoom || state.nights === 0) {
            sRate.textContent = 'KES 0';
            sTaxes.textContent = 'KES 0';
            sTotal.textContent = 'KES 0';
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Select a Room';
            return;
        }

        const subtotal = state.roomPrice * state.nights;
        const taxes = subtotal * 0.10;
        const total = subtotal + taxes;

        // Format Currency
        const fmt = (n) => 'KES ' + n.toLocaleString();

        sRate.textContent = fmt(subtotal);
        sTaxes.textContent = fmt(taxes);
        sTotal.textContent = fmt(total);

        confirmBtn.disabled = false;
        confirmBtn.textContent = `Confirm Booking (${fmt(total)})`;
    };

    // Event Listeners
    checkInInput.addEventListener('change', () => {
        // Ensure check-out is at least 1 day after
        const newCheckIn = new Date(checkInInput.value);
        const newCheckOutMin = new Date(newCheckIn);
        newCheckOutMin.setDate(newCheckIn.getDate() + 1);

        checkOutInput.min = newCheckOutMin.toISOString().split('T')[0];
        if (new Date(checkOutInput.value) <= newCheckIn) {
            checkOutInput.valueAsDate = newCheckOutMin;
        }

        updateDateState();
    });

    checkOutInput.addEventListener('change', updateDateState);

    roomCards.forEach(card => {
        // Add click listener to the whole card for better UX
        card.addEventListener('click', (e) => {
            // Prevent triggering if clicking a link
            if (e.target.tagName === 'A') return;

            const btn = card.querySelector('.select-room-btn');
            handleRoomSelect(card, btn);
        });
    });

    // Handle Confirm
    confirmBtn.addEventListener('click', () => {
        alert(`Booking Confirmed!\n\nGuest: Look forward to seeing you!\nRoom: ${state.selectedRoom}\nTotal: ${sTotal.textContent}\n\n(This is a demo booking system)`);
    });

    // Sub-feature: Pre-select from URL params
    const params = new URLSearchParams(window.location.search);
    const packageType = params.get('package');
    if (packageType) {
        // Just a simple demo of handling params
        console.log('Package selected:', packageType);
        // Could auto-select a room here based on package
    }

    // Initialize
    initDates();
});
