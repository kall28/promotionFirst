$(document).ready(function () {
    // Toggle Password Visibility
    $(".toggle-password").click(function () {
      const $input = $(this).prev("input");
      const type = $input.attr("type") === "password" ? "text" : "password";
      $input.attr("type", type);
    });

    // Password Strength Checker
    $(".password").on("input", function () {
      const password = $(this).val();
      const $strengthBoxes = $(".strength-box");
      const $strengthText = $(".password-strength-text");
      const strength = getPasswordStrength(password);

      $strengthBoxes.removeClass("active weak medium strong");
      $strengthBoxes.each((index, box) => {
        if (index < strength.score) {
          $(box).addClass(strength.class);
        }
      });

      $strengthText.text(strength.feedback);
    });

    function getPasswordStrength(password) {
      let score = 0;
      let feedback = "Weak";
      let strengthClass = "weak";

      if (password.length > 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score === 4) {
        feedback = "Strong";
        strengthClass = "active";
      } else if (score === 3) {
        feedback = "Medium";
        strengthClass = "medium";
      } else if (score > 0) {
        feedback = "Weak";
        strengthClass = "weak";
      }

      return { score, feedback, class: strengthClass };
    }

    // Form Validation
    $(".submit-btn").click(function () {
      let isValid = true;
      $(".form_wrap input[required]").each(function () {
        const $input = $(this);
        if (!$input.val().trim()) {
          $input.addClass("is-invalid");
          isValid = false;
        } else {
          $input.removeClass("is-invalid");
          if ($input.hasClass("email") && !validateEmail($input.val())) {
            $input.addClass("is-invalid");
            isValid = false;
          }
          if ($input.hasClass("confirm-password") && $input.val() !== $(".password").val()) {
            $input.addClass("is-invalid");
            isValid = false;
          }
        }
      });

      if (!$(".terms").is(":checked")) {
        $(".terms").addClass("is-invalid");
        isValid = false;
      } else {
        $(".terms").removeClass("is-invalid");
      }

      if (isValid) {
        alert("Form is valid!");
      } else {
        alert("Please fix errors.");
      }
    });

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
