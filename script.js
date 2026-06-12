	/* TAB */

	function openTab(event,tabId){document.querySelectorAll('.form-box').forEach(box=>{box.classList.remove('active');});
		document.querySelectorAll('.tab-btn').forEach(btn=>{btn.classList.remove('active');});
		document.getElementById(tabId).classList.add('active');
		event.target.classList.add('active');
	}

	/* SERVICE TYPE */

	const serviceType = document.getElementById('serviceType');
	const outstationTypeBox = document.getElementById('outstationTypeBox');
	const addPlaceBox = document.getElementById('addPlaceBox');
	const hourlyRentalBox = document.getElementById('hourlyRentalBox');
		serviceType.addEventListener('change',()=>{
			if(serviceType.value === 'Outstation'){outstationTypeBox.style.display='block'; addPlaceBox.style.display='block'; hourlyRentalBox.style.display='none';}
			else if(serviceType.value === 'Local'){outstationTypeBox.style.display='none'; addPlaceBox.style.display='none'; hourlyRentalBox.style.display='block';}
			else{outstationTypeBox.style.display='none'; addPlaceBox.style.display='none'; hourlyRentalBox.style.display='none';}
	});

	/* INITIAL LOAD FIX */
	serviceType.dispatchEvent(new Event('change'));

	/* ROUNDTRIP */

	const outstationType = document.getElementById('outstationType');
	const returnBox = document.getElementById('returnBox');
		outstationType.addEventListener('change',()=>{
		if(outstationType.value === 'Roundtrip'){returnBox.style.display='block';}
		else{returnBox.style.display='none';}
	});

	/* PASSENGER CONDITION */

	const passengerCount = document.getElementById('passengerCount');
	const carSelection = document.getElementById('carSelection');
		passengerCount.addEventListener('input',()=>{
		let count = parseInt(passengerCount.value);
		if(isNaN(count)){carSelection.innerHTML = '<option value="">Select Passenger Count First</option>';
		return;
	}
	
	let options = [];
	if(count <=4){
	options=["Swift Dzire / Hyundai Xcent / Tata Zest", "Scorpio / Innova / Ertiga", "13 Seater Tempo Traveller"];
	}

	else if(count <=6){
	options=["Scorpio / Innova / Ertiga", "13 Seater Tempo Traveller"];
	}

	else if(count <=7){
	options=["Scorpio / Innova", "13 Seater Tempo Traveller"];
	}

	else if(count <=8){
	options=["Scorpio", "13 Seater Tempo Traveller"];
	}

	else if(count <=13){
	options=["13 Seater Tempo Traveller", "26 Seater Tempo Traveller"];
	}

	else if(count <=25){
	options=["26 Seater Tempo Traveller", "30 Seater Bus AC", "35 Seater Bus AC", "40 Seater Bus AC"];
	}

	else if(count <=30){
	options=["30 Seater Bus AC", "35 Seater Bus AC", "40 Seater Bus AC"];
	}

	else if(count <=35){
	options=["35 Seater Bus AC", "40 Seater Bus AC"];
	}

	else if(count <=40){
	options=["40 Seater Bus AC"];
	}

	else{alert("Please Contact Helpline Number: 9007350757");
		carSelection.innerHTML = '<option value="">Not Available</option>';
	}

	carSelection.innerHTML='';
	options.forEach(option=>{
	let opt=document.createElement('option');
		opt.textContent=option;
		carSelection.appendChild(opt);
	});
	});

	/* DATE VALIDATION */

	document.getElementById('pickupDate').min =
	new Date().toISOString().slice(0,16);


	/* WHATSAPP AUTO BOOKING MESSEGE */

	function getBookingDetails(){
	let service = document.getElementById("serviceType").value;
	let hourly = document.getElementById("hourlyPackage").value;
	let outstationType = document.getElementById("outstationType").value;
	let pickup = document.getElementById("pickupLocation").value;
	let destination = document.getElementById("destination").value;
	let addPlace = document.querySelector("#addPlaceBox input").value;
	let passenger = document.getElementById("passengerCount").value;
	let car = document.getElementById("carSelection").value;
	let pickupDateRaw = document.getElementById("pickupDate").value;
	let returnDateRaw = document.getElementById("returnDate") ?
		document.getElementById("returnDate").value : "";
	let name = document.getElementById("customerName").value;
	let phone = document.getElementById("customerPhone").value;
	let otherInfo = document.querySelector("#ride textarea").value;


	/* DATE FORMAT */

	function formatDateTime(dateValue){
	if(!dateValue) return "";
	let date = new Date(dateValue);
	return date.toLocaleString("en-IN",{day:"2-digit", month:"short", year:"numeric", hour:"numeric", minute:"2-digit", hour12:true
	});}

	let pickupDate = formatDateTime(pickupDateRaw);
	let returnDate = formatDateTime(returnDateRaw);
	if(service === "Outstation" &&
		outstationType === "Roundtrip" &&
		returnDateRaw === ""){
		alert("Please Select Return Date");
	return false;
	}
	if(returnDateRaw && new Date(returnDateRaw) < new Date(pickupDateRaw)){
		alert("Return Date Must Be After Pickup Date");
	return false;
	}


	/* MESSAGE */

	let msg = `
	🚖 *New Booking Request*

	👤 Customer Name: ${name}

	📞 Contact Number: ${phone}

	🚕 Service Type: ${service}
	`;

	/* LOCAL */

	if(service === "Local"){

	msg += `
	⏰ Hourly Package: ${hourly}
	`;
	}

	/* OUTSTATION */

	if(service === "Outstation"){
	msg += `
	🛣 Outstation Type: ${outstationType}
	`;
	}

	/* COMMON DETAILS */

	msg += `
	📍 Pickup Location: ${pickup}

	📌 Destination: ${destination}
	`;

	/* ADDITIONAL PLACE */

	if(addPlace !== ""){
	msg += `
	➕ More Places: ${addPlace}
	`;
	}

	/* PASSENGER */

	msg += `
	👥 Passengers: ${passenger}

	🚘 Vehicle: ${car}

	📅 Pickup Date & Time: ${pickupDate}
	`;

	/* ROUNDTRIP */

	if(service === "Outstation" &&
	outstationType === "Roundtrip"){
	msg += `
	🔁 Return Date & Time: ${returnDate}
	`;
	}

	/* OTHER INFO */

	if(otherInfo !== ""){
	msg += `
	📝 Any Other Information: ${otherInfo}`;
	}

	/* FOOTER */

	msg += `
	Thank You
	ARJUN CAR RENTAL
	(EXECUTIVE TAXI SERVICE)
	`;
	return msg;
	}

	function previewBooking(){
	if(!validateBookingForm()){
	return;
	}
	let msg = getBookingDetails();
		document.getElementById("previewContent").innerHTML =
		escapeHTML(msg)
		.replace(/\n/g,"<br>")
		.replace(/\*([^*]+)\*/g,"<b>$1</b>");
		document.getElementById("previewPopup").style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	/* CLOSE */

	function closePreview(){
		document.getElementById("previewPopup").style.display = "none";
		document.body.style.overflow = "auto";
	}

	/* CONFIRM */

	function confirmBooking(){
	let msg = getBookingDetails();

	/* COMPANY WHATSAPP */

	let ownerUrl = "https://wa.me/919007350757?text=" + encodeURIComponent(msg); 
		window.open(ownerUrl,"_blank");
	if(typeof gtag === "function"){
		gtag('event', 'booking_submit', {
		event_category: 'Booking',
		event_label: 'Ride Booking'
	});
	}

	alert("Booking Submitted Successfully!");
	closePreview();
	}

	/* SUBMIT BUTTON */

	function sendWhatsApp(){
	if(!validateBookingForm()){
	return;
	}
	confirmBooking();
	}
	
	message += `

💳 ADVANCE PAYMENT

Please scan the QR Code available on our website.

UPI ID:
9123842782@okbizaxis

📲 After payment send screenshot on WhatsApp:
9007350757
`;

	/* SCHOOL POOL SERVICE */

	function getSchoolDetails(){
	let inputs =
		document.querySelectorAll("#school input");
	let studentName = inputs[0].value;
	let age = inputs[1].value;
	let studentClass = inputs[2].value;
	let parentName = inputs[3].value;
	let phone = inputs[4].value;
	let school = inputs[5].value;
	let pickup = inputs[6].value;
	let time = inputs[7].value;
	let otherInfo =
		document.querySelector("#school textarea").value;

	/* TIME FORMAT */

	function formatTime(timeValue){
	if(!timeValue) return "";
	let [hour, minute] = timeValue.split(":");
	let date = new Date();
		date.setHours(hour);
		date.setMinutes(minute);
	return date.toLocaleTimeString("en-IN",{
		hour:"numeric",
		minute:"2-digit",
		hour12:true
	});
	}

	let formattedTime =
	formatTime(time);
	let msg = `
	🚌 *School Pool Service Request*

	👦 Student Name: ${studentName}

	🎂 Age: ${age}

	🏫 Class: ${studentClass}

	👨 Parent Name: ${parentName}

	📞 Contact Number: ${phone}

	🏫 School Name: ${school}

	📍 Pickup Location: ${pickup}

	⏰ Pickup Time: ${formattedTime}
	`;

	/* OTHER INFO */

	if(otherInfo !== ""){
	msg += `
	📝 Any Other Information: ${otherInfo}
	`;
	}

	msg += `
	Thank You
	ARJUN CAR RENTAL
	(EXECUTIVE TAXI SERVICE)
	`;
	return msg;
	}

	/* SCHOOL PREVIEW */

	function previewSchoolBooking(){
	let requiredFields = document.querySelectorAll("#school input[required]");
	for(let field of requiredFields){
	if(field.value.trim() === ""){
		alert("Please Fill All Required Fields");
	return;
	}}
	let msg = getSchoolDetails();
		document.getElementById("schoolPreviewContent").innerHTML = escapeHTML(msg)
		.replace(/\n/g,"<br>")
		.replace(/\*([^*]+)\*/g,"<b>$1</b>");
		document.getElementById("schoolPreviewPopup").style.display = "flex";
	}

	/* CLOSE */

	function closeSchoolPreview(){document.getElementById("schoolPreviewPopup").style.display = "none";}

	/* CONFIRM */

	function confirmSchoolBooking(){
		let msg = getSchoolDetails();

	/* OWNER */

	let ownerUrl = "https://wa.me/919007350757?text=" + encodeURIComponent(msg);
		window.open(ownerUrl,"_blank");

	/* CUSTOMER */

	let phone = document.querySelectorAll("#school input")[4].value;
	if(phone){
	let customerUrl = "https://wa.me/" + phone.replace(/\D/g,'').slice(-10) + "?text=" + encodeURIComponent(msg);
		window.open(customerUrl,"_blank");}

	closeSchoolPreview();
		document.body.style.overflow = "auto";
	}

	/* ATTACH CAR */

	function getAttachDetails(){
	let inputs = document.querySelectorAll("#attach input");
	let ownerName = inputs[0].value;
	let phone = inputs[1].value;
	let email = inputs[2].value;
	let company = inputs[3].value;
	let model = inputs[4].value;
	let fuel = document.querySelector("#attach select").value;
	let reg = inputs[5].value;
	let garage = inputs[6].value;
	let otherInfo = document.querySelector("#attach textarea").value;
	let msg = `
	🚘 *Attach Car Request*

	👤 Owner Name: ${ownerName}

	📞 Contact Number: ${phone}

	📧 Email: ${email}

	🏢 Car Company: ${company}

	🚗 Model: ${model}

	⛽ Fuel Type: ${fuel}

	🪪 Registration Number: ${reg}

	📍 Garage Location: ${garage}
	`;

	/* OTHER INFO */

	if(otherInfo !== ""){
	msg += `
	📝 Any Other Information: ${otherInfo}
	`;
	}
	msg += `
	Thank You
	ARJUN CAR RENTAL
	(EXECUTIVE TAXI SERVICE)
	`;
	return msg;
	}

	/* PREVIEW */

	function previewAttachBooking(){
	let requiredFields = document.querySelectorAll("#attach input[required]");
	for(let field of requiredFields){
	if(field.value.trim() === ""){
		alert("Please Fill All Required Fields");
	return;
	}
	}
	let msg = getAttachDetails();
		document.getElementById("attachPreviewContent").innerHTML = escapeHTML(msg)
		.replace(/\n/g,"<br>")
		.replace(/\*([^*]+)\*/g,"<b>$1</b>");
		document.getElementById("attachPreviewPopup").style.display = "flex";
	}

	/* CLOSE */

	function closeAttachPreview(){
		document.getElementById("attachPreviewPopup").style.display = "none";
	}

	/* CONFIRM */

	function confirmAttachBooking(){
	let msg = getAttachDetails();

	/* OWNER */

	let ownerUrl = "https://wa.me/919007350757?text=" + encodeURIComponent(msg);
		window.open(ownerUrl,"_blank");

	/* CUSTOMER */

	let phone = document.querySelectorAll("#attach input")[1].value;
	if(phone){
	let customerUrl = "https://wa.me/" + phone.replace(/\D/g,'').slice(-10) + "?text=" + encodeURIComponent(msg);
		window.open(customerUrl,"_blank");
	}
	closeAttachPreview();
	}
	function validateBookingForm(){
	let name = document.getElementById("customerName").value;
	let phone = document.getElementById("customerPhone").value;
	let pickup = document.getElementById("pickupLocation").value;
	let cleanedPhone = phone.replace(/\D/g,'');
	if(cleanedPhone.length === 12 &&
		cleanedPhone.startsWith("91")){
		cleanedPhone = cleanedPhone.slice(2);
	}
	let phonePattern = /^[6-9]\d{9}$/;
	if(!phonePattern.test(cleanedPhone)){
		alert("Enter Valid Mobile Number");
	return false;
	}
	let passenger = document.getElementById("passengerCount").value;
	let car = document.getElementById("carSelection").value;
	let pickupDate = document.getElementById("pickupDate").value;
	if(passenger === ""){
		alert("Please Enter Passenger Count");
	return false;
	}
	if(car === ""){
		alert("Please Select Vehicle");
	return false;
	}
	if(pickupDate === ""){
		alert("Please Select Pickup Date");
	return false;
	}
	if(name === "" || phone === "" || pickup === ""){
		alert("Please Fill Required Details");
	return false;
	}
	let service =
		document.getElementById("serviceType").value;
	let destination =
		document.getElementById("destination").value;
	if(service !== "Local" && destination === ""){
		alert("Please Enter Destination");
	return false;
	}
	return true;
	}

	/* CLOSE POPUP OUTSIDE CLICK */

	window.addEventListener('click',function(e){
	if(e.target === document.getElementById("previewPopup")){
	closePreview();
	}
	if(e.target === document.getElementById("schoolPreviewPopup")){
	closeSchoolPreview();
	}
	if(e.target === document.getElementById("attachPreviewPopup")){
	closeAttachPreview();
	}
	});

	/* ESC KEY CLOSE */

	document.addEventListener('keydown',function(e){
	if(e.key === "Escape"){
	closePreview();
	closeSchoolPreview();
	closeAttachPreview();
	}
	});

	/* RESET RIDE FORM */

	function resetRideForm(){
	setTimeout(()=>{
		document.getElementById("outstationTypeBox").style.display ="none";
		document.getElementById("returnBox").style.display ="none";
		document.getElementById("addPlaceBox").style.display ="none";
		document.getElementById("hourlyRentalBox").style.display ="block";
		document.getElementById("carSelection").innerHTML ='<option value="">Select Passenger Count First</option>';
		document.getElementById("serviceType").value ="Local";
	},0);
	}

	/* FLOATING WHATSAPP CHAT */

	function openWhatsAppChat(){
		window.open("https://wa.me/919007350757", "_blank");
	}
	function escapeHTML(str){
	return str
	.replace(/&/g,"&amp;")
	.replace(/</g,"&lt;")
	.replace(/>/g,"&gt;")
	.replace(/"/g,"&quot;")
	.replace(/'/g,"&#039;");
	}
