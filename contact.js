document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  // Load EmailJS SDK
  // Add this to your HTML if you haven't already:
  // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  
  // Initialize EmailJS
  // Replace with your actual EmailJS user ID
  const EMAILJS_USER_ID = "YOUR_EMAILJS_USER_ID"; 
  const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
  
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_USER_ID);
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Validate email
      if (!email.endsWith('@vhhscougars.org')) {
        showStatus('Please use your @vhhscougars.org email address.', 'error');
        return;
      }
      
      // Show loading state
      showStatus('Sending message...', 'loading');
      
      // Prepare EmailJS parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'rileyjaewook@gmail.com' // This will be hidden in the EmailJS template
      };
      
      // Send email using EmailJS
      if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Hide status after 5 seconds
            setTimeout(() => {
              formStatus.classList.add('hidden');
            }, 5000);
          })
          .catch(function(error) {
            console.log('FAILED...', error);
            showStatus('Failed to send message. Please try again later.', 'error');
          });
      } else {
        // Fallback if EmailJS is not loaded
        console.log('EmailJS not loaded. Form data:', templateParams);
        showStatus('Unable to send message. Please try again later.', 'error');
      }
    });
  }
  
  // Helper function to show status messages
  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700', 'bg-blue-100', 'text-blue-700');
    
    switch(type) {
      case 'success':
        formStatus.classList.add('bg-green-100', 'text-green-700');
        break;
      case 'error':
        formStatus.classList.add('bg-red-100', 'text-red-700');
        break;
      case 'loading':
        formStatus.classList.add('bg-blue-100', 'text-blue-700');
        break;
    }
  }
});
