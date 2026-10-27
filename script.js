// =====================================================
// SMARTBANK - COMPLETE SCRIPT
// =====================================================

let balance = 0;
let totalDeposits = 0;
let totalWithdrawals = 0;
let transactions = [];


// =====================================================
// SECTION NAVIGATION
// =====================================================

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    updateDashboard();
}


// =====================================================
// BANK MESSAGE
// =====================================================

function showMessage(message) {

    const element = document.getElementById("bankMessage");

    if (!element) return;

    element.textContent = message;

    setTimeout(() => {
        element.textContent = "";
    }, 3000);
}


// =====================================================
// DEPOSIT
// =====================================================

function depositMoney() {

    const input = document.getElementById("depositAmount");

    if (!input) return;

    const amount = Number(input.value);

    if (amount <= 0) {
        showMessage("Please enter a valid amount.");
        return;
    }

    balance += amount;
    totalDeposits += amount;

    addTransaction("Deposit", amount);

    input.value = "";

    showMessage("✅ Deposit successful!");

    updateDashboard();
}


// =====================================================
// WITHDRAW
// =====================================================

function withdrawMoney() {

    const input = document.getElementById("withdrawAmount");

    if (!input) return;

    const amount = Number(input.value);

    if (amount <= 0) {
        showMessage("Please enter a valid amount.");
        return;
    }

    if (amount > balance) {
        showMessage("❌ Insufficient balance.");
        return;
    }

    balance -= amount;
    totalWithdrawals += amount;

    addTransaction("Withdraw", amount);

    input.value = "";

    showMessage("✅ Withdrawal successful!");

    updateDashboard();
}


// =====================================================
// TRANSACTION
// =====================================================

function addTransaction(type, amount) {

    transactions.unshift({
        date: new Date().toLocaleString(),
        type: type,
        amount: amount
    });

    updateDashboard();
}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

    const balanceElement = document.getElementById("balance");
    const depositsElement = document.getElementById("deposits");
    const withdrawalsElement = document.getElementById("withdrawals");
    const transactionCount = document.getElementById("transactionCount");

    if (balanceElement) {
        balanceElement.textContent =
            "₹" + balance.toLocaleString();
    }

    if (depositsElement) {
        depositsElement.textContent =
            "₹" + totalDeposits.toLocaleString();
    }

    if (withdrawalsElement) {
        withdrawalsElement.textContent =
            "₹" + totalWithdrawals.toLocaleString();
    }

    if (transactionCount) {
        transactionCount.textContent =
            transactions.length;
    }

    const reportDeposits =
        document.getElementById("reportDeposits");

    const reportWithdrawals =
        document.getElementById("reportWithdrawals");

    const reportBalance =
        document.getElementById("reportBalance");

    if (reportDeposits) {
        reportDeposits.textContent =
            "₹" + totalDeposits.toLocaleString();
    }

    if (reportWithdrawals) {
        reportWithdrawals.textContent =
            "₹" + totalWithdrawals.toLocaleString();
    }

    if (reportBalance) {
        reportBalance.textContent =
            "₹" + balance.toLocaleString();
    }

    const table =
        document.getElementById("transactionTable");

    if (!table) return;

    table.innerHTML = "";

    transactions.slice(0, 10).forEach(transaction => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>₹${transaction.amount.toLocaleString()}</td>
        `;

        table.appendChild(row);
    });
}


// =====================================================
// EMI CALCULATOR
// =====================================================

function calculateEMI() {

    const principal =
        Number(document.getElementById("loanAmount")?.value);

    const annualRate =
        Number(document.getElementById("interestRate")?.value);

    const years =
        Number(document.getElementById("loanYears")?.value);

    if (
        principal <= 0 ||
        annualRate < 0 ||
        years <= 0
    ) {

        alert("Please enter valid loan details.");

        return;
    }

    const monthlyRate =
        annualRate / 12 / 100;

    const months =
        years * 12;

    let emi;

    if (monthlyRate === 0) {

        emi = principal / months;

    } else {

        emi =
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment =
        emi * months;

    const totalInterest =
        totalPayment - principal;

    const emiResult =
        document.getElementById("emiResult");

    const interestResult =
        document.getElementById("interestResult");

    const totalPaymentResult =
        document.getElementById("totalPayment");

    if (emiResult) {
        emiResult.textContent =
            "₹" + emi.toFixed(2);
    }

    if (interestResult) {
        interestResult.textContent =
            "₹" + totalInterest.toFixed(2);
    }

    if (totalPaymentResult) {
        totalPaymentResult.textContent =
            "₹" + totalPayment.toFixed(2);
    }
}


// =====================================================
// INSURANCE TRACKER
// =====================================================

function addInsurance() {

    const name =
        document.getElementById("insuranceName")?.value.trim();

    const premium =
        Number(document.getElementById("premiumAmount")?.value);

    const dueDate =
        document.getElementById("dueDate")?.value;

    if (
        name === "" ||
        premium <= 0 ||
        dueDate === ""
    ) {

        alert("Please enter all insurance details.");

        return;
    }

    const today = new Date();
    const due = new Date(dueDate);

    const difference =
        due.getTime() - today.getTime();

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

    let status;

    if (days < 0) {
        status = "🔴 Overdue";
    }
    else if (days <= 7) {
        status = "🟠 Due Soon";
    }
    else {
        status = "🟢 Upcoming";
    }

    const insuranceList =
        document.getElementById("insuranceList");

    if (!insuranceList) return;

    const item =
        document.createElement("div");

    item.className =
        "insurance-item";

    item.innerHTML = `
        <h3>🛡️ ${name}</h3>

        <p>
            Premium:
            ₹${premium.toLocaleString()}
        </p>

        <p>
            Due Date:
            ${dueDate}
        </p>

        <p>
            ${status}
        </p>
    `;

    insuranceList.appendChild(item);

    document.getElementById("insuranceName").value = "";
    document.getElementById("premiumAmount").value = "";
    document.getElementById("dueDate").value = "";
}


// =====================================================
// BANK MACHINES DATABASE
// =====================================================

const bankMachines = [

    // =================================================
    // 1. ATM MACHINE
    // =================================================

    {
        name: "ATM Machine",
        image: "atm.png",
        category: "Self-Service Banking",

        description:
            "An Automated Teller Machine allows customers to perform banking operations such as cash withdrawal, balance enquiry, card authentication and receipt printing.",

        parts: [

            {
                name: "Card Reader",
                type: "Input Component",
                image: "card-reader.png",
                function:
                    "Reads information from the customer's bank card and sends the card data to the ATM control system."
            },

            {
                name: "PIN Pad",
                type: "Input Component",
                image: "pin-pad.png",
                function:
                    "Allows the customer to securely enter the PIN required for authentication."
            },

            {
                name: "Display",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Shows menus, transaction information, instructions and banking messages."
            },

            {
                name: "Cash Dispenser",
                type: "Mechanical Component",
                image: "cash-dispenser.png",
                function:
                    "Moves selected currency notes from the cash cassette to the customer."
            },

            {
                name: "Receipt Printer",
                type: "Output Component",
                image: "receipt-printer.png",
                function:
                    "Prints transaction receipts containing information such as transaction type and amount."
            },

            {
                name: "Security Camera",
                type: "Security Component",
                image: "security-camera.png",
                function:
                    "Can be used for security monitoring and recording activity around the ATM."
            },

            {
                name: "Cash Sensor",
                type: "Sensor",
                image: "cash-sensor.png",
                function:
                    "Detects the movement and presence of currency notes inside the cash handling mechanism."
            }
        ]
    },


    // =================================================
    // 2. BIOMETRIC DEVICE
    // =================================================

    {
        name: "Biometric Device",
        image: "biometric-device.png",
        category: "Authentication",

        description:
            "A biometric device identifies or verifies a person using biological characteristics such as fingerprints or facial information.",

        parts: [

            {
                name: "Fingerprint Sensor",
                type: "Biometric Sensor",
                image: "fingerprint-sensor.png",
                function:
                    "Captures the fingerprint pattern and converts it into digital information for identity verification."
            },

            {
                name: "Camera Module",
                type: "Sensor",
                image: "camera-module.png",
                function:
                    "Captures facial or visual information when the device supports camera-based authentication."
            },

            {
                name: "Display Screen",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Displays instructions, authentication status and messages to the user."
            },

            {
                name: "Control Board",
                type: "Electronic Component",
                image: "control-board.png",
                function:
                    "Processes information received from sensors and controls the operation of the biometric device."
            },

            {
                name: "Status LED",
                type: "Indicator",
                image: "status-led.png",
                function:
                    "Provides visual indication of device status such as ready, processing or successful authentication."
            },

            {
                name: "Speaker",
                type: "Output Component",
                image: "speaker.png",
                function:
                    "Produces audio feedback and instructions for the user."
            }
        ]
    },


    // =================================================
    // 3. CASH COUNTING MACHINE
    // =================================================

    {
        name: "Cash Counting Machine",
        image: "cash-counting-machine.png",
        category: "Cash Handling",

        description:
            "A cash counting machine automatically feeds, counts and processes currency notes at high speed.",

        parts: [

            {
                name: "Counting Sensor",
                type: "Sensor",
                image: "counting-sensor.png",
                function:
                    "Detects each note passing through the machine so the system can calculate the total number of notes."
            },

            {
                name: "Feed Roller",
                type: "Mechanical Component",
                image: "feed-roller.png",
                function:
                    "Pulls currency notes from the input tray into the counting mechanism."
            },

            {
                name: "Separation Roller",
                type: "Mechanical Component",
                image: "separation-roller.png",
                function:
                    "Helps separate individual notes so that they can be counted correctly."
            },

            {
                name: "UV Sensor",
                type: "Detection Sensor",
                image: "uv-sensor.png",
                function:
                    "Uses ultraviolet characteristics to assist with currency note checking."
            },

            {
                name: "Magnetic Sensor",
                type: "Detection Sensor",
                image: "magnetic-sensor.png",
                function:
                    "Detects magnetic characteristics used in currency verification systems."
            },

            {
                name: "Display",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Displays the number of notes counted and other machine information."
            },

            {
                name: "Drive Motor",
                type: "Mechanical Component",
                image: "drive-motor.png",
                function:
                    "Provides mechanical power to the rollers and note feeding system."
            }
        ]
    },


    // =================================================
    // 4. POS MACHINE
    // =================================================

    {
        name: "POS Machine",
        image: "pos-machine.png",
        category: "Digital Payments",

        description:
            "A Point of Sale terminal is used by businesses and banking environments to process card and digital payment transactions.",

        parts: [

            {
                name: "Chip Card Reader",
                type: "Card Reader",
                image: "chip-reader.png",
                function:
                    "Reads information from the chip embedded in a payment card."
            },

            {
                name: "NFC Reader",
                type: "Wireless Component",
                image: "nfc-reader.png",
                function:
                    "Enables contactless payment communication between a compatible card or device and the terminal."
            },

            {
                name: "Keypad",
                type: "Input Component",
                image: "keypad.png",
                function:
                    "Allows users to enter PINs and other required transaction information."
            },

            {
                name: "Display Screen",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Displays transaction amount, instructions and payment status."
            },

            {
                name: "Receipt Printer",
                type: "Output Component",
                image: "receipt-printer.png",
                function:
                    "Prints a physical transaction receipt."
            },

            {
                name: "Battery",
                type: "Power Component",
                image: "battery.png",
                function:
                    "Provides electrical power to portable POS hardware."
            }
        ]
    },


    // =================================================
    // 5. CHEQUE SCANNER
    // =================================================

    {
        name: "Cheque Scanner",
        image: "cheque-scanner.png",
        category: "Document Processing",

        description:
            "A cheque scanner captures cheque images and may read machine-readable information to support digital cheque processing.",

        parts: [

            {
                name: "Image Sensor",
                type: "Optical Sensor",
                image: "image-sensor.png",
                function:
                    "Captures a digital image of the cheque."
            },

            {
                name: "Paper Feed Roller",
                type: "Mechanical Component",
                image: "feed-roller.png",
                function:
                    "Moves the cheque through the scanning path."
            },

            {
                name: "MICR Reader",
                type: "Reading Component",
                image: "micr-reader.png",
                function:
                    "Reads magnetic-ink character information printed on supported cheques."
            },

            {
                name: "Control Board",
                type: "Electronic Component",
                image: "control-board.png",
                function:
                    "Controls scanner electronics and coordinates information received from different components."
            },

            {
                name: "Drive Motor",
                type: "Mechanical Component",
                image: "drive-motor.png",
                function:
                    "Provides movement for the paper feeding mechanism."
            }
        ]
    },


    // =================================================
    // 6. CURRENCY DETECTOR
    // =================================================

    {
        name: "Currency Detector",
        image: "currency-detector.png",
        category: "Currency Verification",

        description:
            "A currency detection machine uses different sensing technologies to help examine security characteristics of banknotes.",

        parts: [

            {
                name: "UV Sensor",
                type: "Detection Sensor",
                image: "uv-sensor.png",
                function:
                    "Examines ultraviolet characteristics of a banknote."
            },

            {
                name: "Infrared Sensor",
                type: "Detection Sensor",
                image: "infrared-sensor.png",
                function:
                    "Uses infrared sensing to examine selected properties of a banknote."
            },

            {
                name: "Magnetic Sensor",
                type: "Detection Sensor",
                image: "magnetic-sensor.png",
                function:
                    "Detects magnetic characteristics used in currency verification."
            },

            {
                name: "Image Sensor",
                type: "Optical Sensor",
                image: "image-sensor.png",
                function:
                    "Captures visual information from the banknote for machine processing."
            },

            {
                name: "Display",
                type: "Output Component",
                image: "display-screen.png",
                function:
                    "Displays the machine's detection or verification status."
            }
        ]
    },


    // =================================================
    // 7. PASSBOOK PRINTER
    // =================================================

    {
        name: "Passbook Printer",
        image: "passbook-printer.png",
        category: "Bank Printing",

        description:
            "A passbook printer prints transaction details into a customer's physical bank passbook.",

        parts: [

            {
                name: "Print Head",
                type: "Printing Component",
                image: "print-head.png",
                function:
                    "Creates printed characters on the passbook."
            },

            {
                name: "Paper Feed Roller",
                type: "Mechanical Component",
                image: "feed-roller.png",
                function:
                    "Moves the passbook through the printing mechanism."
            },

            {
                name: "Position Sensor",
                type: "Sensor",
                image: "position-sensor.png",
                function:
                    "Helps detect the position of the passbook so printing can occur in the correct location."
            },

            {
                name: "Display",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Displays operating instructions and status messages."
            },

            {
                name: "Control Board",
                type: "Electronic Component",
                image: "control-board.png",
                function:
                    "Controls printer operations and communication with the banking system."
            }
        ]
    },


    // =================================================
    // 8. CASH DEPOSIT MACHINE
    // =================================================

    {
        name: "Cash Deposit Machine",
        image: "cash-deposit-machine.png",
        category: "Self-Service Banking",

        description:
            "A Cash Deposit Machine allows customers to deposit currency notes using an automated note handling system.",

        parts: [

            {
                name: "Note Acceptor",
                type: "Input Component",
                image: "note-acceptor.png",
                function:
                    "Receives currency notes from the customer and feeds them into the verification system."
            },

            {
                name: "Counting Sensor",
                type: "Sensor",
                image: "counting-sensor.png",
                function:
                    "Counts notes while they pass through the machine."
            },

            {
                name: "Scanner",
                type: "Detection Component",
                image: "image-sensor.png",
                function:
                    "Captures information from notes for automated processing."
            },

            {
                name: "Storage Cassette",
                type: "Storage Component",
                image: "storage-cassette.png",
                function:
                    "Stores deposited currency notes inside the machine."
            },

            {
                name: "Display",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Shows deposit instructions, detected amount and transaction status."
            },

            {
                name: "Receipt Printer",
                type: "Output Component",
                image: "receipt-printer.png",
                function:
                    "Prints a receipt confirming the transaction."
            }
        ]
    },


    // =================================================
    // 9. TOKEN / QUEUE MACHINE
    // =================================================

    {
        name: "Token / Queue Machine",
        image: "token-machine.png",
        category: "Queue Management",

        description:
            "A token or queue management machine issues numbered tokens and helps organize customer service queues.",

        parts: [

            {
                name: "Touch Display",
                type: "User Interface",
                image: "touch-display.png",
                function:
                    "Allows customers to select the required banking service."
            },

            {
                name: "Thermal Printer",
                type: "Printing Component",
                image: "receipt-printer.png",
                function:
                    "Prints the queue token."
            },

            {
                name: "Touch Sensor",
                type: "Input Sensor",
                image: "touch-sensor.png",
                function:
                    "Detects touch input from the customer."
            },

            {
                name: "Speaker",
                type: "Audio Component",
                image: "speaker.png",
                function:
                    "Can announce queue numbers or provide audio instructions."
            },

            {
                name: "Control Board",
                type: "Electronic Component",
                image: "control-board.png",
                function:
                    "Controls the display, printer, speaker and queue management functions."
            }
        ]
    },


    // =================================================
    // 10. DOCUMENT SCANNER
    // =================================================

    {
        name: "Document Scanner",
        image: "document-scanner.png",
        category: "Document Processing",

        description:
            "A document scanner converts physical documents into digital images for storage and processing.",

        parts: [

            {
                name: "Image Sensor",
                type: "Optical Sensor",
                image: "image-sensor.png",
                function:
                    "Captures the visual information of the document."
            },

            {
                name: "Feed Roller",
                type: "Mechanical Component",
                image: "feed-roller.png",
                function:
                    "Moves documents through the scanner."
            },

            {
                name: "Glass Scanning Area",
                type: "Scanning Component",
                image: "glass-scaning-area.png",
                function:
                    "Provides the scanning surface through which the document is captured."
            },

            {
                name: "Drive Motor",
                type: "Mechanical Component",
                image: "drive-motor.png",
                function:
                    "Provides movement to the document feeding system."
            },

            {
                name: "Control Board",
                type: "Electronic Component",
                image: "control-board.png",
                function:
                    "Coordinates the scanner sensors, motor and image processing."
            }
        ]
    },


    // =================================================
    // 11. NOTE SORTING MACHINE
    // =================================================

    {
        name: "Note Sorting Machine",
        image: "note-sorting-machine.png",
        category: "Cash Processing",

        description:
            "A note sorting machine processes currency notes and directs them into different groups based on configured sorting criteria.",

        parts: [

            {
                name: "Feed Mechanism",
                type: "Mechanical Component",
                image: "feed-roller.png",
                function:
                    "Feeds individual currency notes into the sorting system."
            },

            {
                name: "Optical Sensor",
                type: "Detection Sensor",
                image: "image-sensor.png",
                function:
                    "Examines optical characteristics of notes."
            },

            {
                name: "Magnetic Sensor",
                type: "Detection Sensor",
                image: "magnetic-sensor.png",
                function:
                    "Detects magnetic characteristics used during currency processing."
            },

            {
                name: "Sorting Gate",
                type: "Mechanical Component",
                image: "sorting-gate.png",
                function:
                    "Directs notes toward different output paths according to the sorting decision."
            },

            {
                name: "Counting Sensor",
                type: "Sensor",
                image: "counting-sensor.png",
                function:
                    "Counts notes as they pass through the sorting mechanism."
            },

            {
                name: "Display",
                type: "User Interface",
                image: "display-screen.png",
                function:
                    "Shows counts, machine status and processing information."
            },

            {
                name: "Drive Motor",
                type: "Mechanical Component",
                image: "drive-motor.png",
                function:
                    "Provides mechanical power for note movement and sorting mechanisms."
            }
        ]
    }
];


// =====================================================
// LOAD BANK MACHINES
// =====================================================

function loadMachines(machineList = bankMachines) {

    const grid =
        document.getElementById("machineGrid");

    if (!grid) return;

    grid.innerHTML = "";

    if (machineList.length === 0) {

        grid.innerHTML = `
            <div class="panel">
                <h2>No machine found</h2>
                <p>Try another search term.</p>
            </div>
        `;

        return;
    }

    machineList.forEach(machine => {

        const originalIndex =
            bankMachines.indexOf(machine);

        const card =
            document.createElement("div");

        card.className =
            "machine-card";

        card.innerHTML = `
            <img
                src="${machine.image}"
                alt="${machine.name}"
                onerror="this.src='placeholder.png'"
            >

            <h2>
                ${machine.name}
            </h2>

            <p>
                ${machine.description}
            </p>

            <button type="button">
                View Components →
            </button>
        `;

        card.addEventListener("click", () => {
            openMachine(originalIndex);
        });

        grid.appendChild(card);
    });
}


// =====================================================
// SEARCH MACHINES
// =====================================================

function searchMachines() {

    const searchInput =
        document.getElementById("machineSearch");

    if (!searchInput) return;

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    // Empty search = show all machines
    if (search === "") {
        loadMachines();
        return;
    }

    const filtered =
        bankMachines.filter(machine => {

            const name =
                machine.name.toLowerCase();

            const category =
                machine.category.toLowerCase();

            const description =
                machine.description.toLowerCase();

            return (
                name.includes(search) ||
                category.includes(search) ||
                description.includes(search)
            );
        });

    loadMachines(filtered);
}


// =====================================================
// OPEN MACHINE MODAL
// =====================================================

function openMachine(index) {

    const machine =
        bankMachines[index];

    if (!machine) return;

    const modal =
        document.getElementById("machineModal");

    const details =
        document.getElementById("machineDetails");

    if (!modal || !details) return;

    let partsHTML = "";

    machine.parts.forEach(part => {

        partsHTML += `
            <div class="part-card">

                <img
                    src="${part.image}"
                    alt="${part.name}"
                    onerror="this.src='placeholder.png'"
                >

                <div>

                    <span class="part-type">
                        ${part.type}
                    </span>

                    <h3>
                        ${part.name}
                    </h3>

                    <p>
                        <strong>Function:</strong>
                        ${part.function}
                    </p>

                </div>

            </div>
        `;
    });

    details.innerHTML = `

        <div class="machine-detail-header">

            <h1>
                ${machine.name}
            </h1>

            <p>
                <strong>Category:</strong>
                ${machine.category}
            </p>

        </div>

        <img
            class="machine-main-image"
            src="${machine.image}"
            alt="${machine.name}"
            onerror="this.src='placeholder.png'"
        >

        <p class="machine-description">
            ${machine.description}
        </p>

        <div class="machine-info-box">

            <div class="machine-info">

                <strong>
                    Machine Type
                </strong>

                ${machine.category}

            </div>

            <div class="machine-info">

                <strong>
                    Components
                </strong>

                ${machine.parts.length}

            </div>

            <div class="machine-info">

                <strong>
                    Learning Mode
                </strong>

                Interactive

            </div>

        </div>

        <h2 class="component-title">
            🔧 Internal Parts & Functions
        </h2>

        <div class="parts-grid">

            ${partsHTML}

        </div>
    `;

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeMachineModal() {

    const modal =
        document.getElementById("machineModal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "auto";
}


// =====================================================
// CLOSE MODAL OUTSIDE
// =====================================================

function closeMachineOutside(event) {

    if (event.target.id === "machineModal") {
        closeMachineModal();
    }
}


// =====================================================
// SEARCH - LIVE SEARCH
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Dashboard
    updateDashboard();

    // Load machines
    loadMachines();

    // Search input
    const searchInput =
        document.getElementById("machineSearch");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchMachines
        );

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    event.preventDefault();
                    searchMachines();
                }

            }
        );
    }

});


// =====================================================
// ESC KEY - CLOSE MODAL
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeMachineModal();
        }

    }
);