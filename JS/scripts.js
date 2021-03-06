// business logic
function Contact(first, last, phone, email, id) {
  this.firstName = first;
  this.lastName = last;
  this.userEmail = email;
  this.phonenumber = phone;
  this.userId = id;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// user interface logic
$(document).ready(function() {
  $("#hidden1").hide();
  $("#hidden2").hide();

  $("form#new-contact").submit(function(event) {
    alert(
      "You are now done booking. Your book will be kept for 48 hours from now, after the time provided without comming to take the book your request will be canceled."
    );

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhone = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-e-mail").val();
    var inputtedId = $("input#new-id").val();

    var newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhone,
      inputtedEmail,
      inputtedId
    );

    $("ul#contacts").append(
      "<li><span class='contact'>" + newContact.fullName() + "</span></li>"
    );

    $(".contact")
      .last()
      .click(function() {
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.firstName);
        $("#show-contact h2")
          .first()
          .click(function() {
            $("h3").toggle();
            // $(this).remove();
          });

        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $(".phone").text(newContact.phonenumber);
        $(".email").text(newContact.userEmail);
        $(".id").text(newContact.userId);
      });
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-e-mail").val("");
    $("input#new-id").val("");

    event.preventDefault();
  });
});
user;

var config = {
  apiKey: "AIzaSyDn2228rz-kwPJJt7wfFVi8FMJdWPg6-iQ",
  authDomain: "group-work-9f3e5.firebaseapp.com",
  databaseURL: "https://group-work-9f3e5.firebaseio.com",
  projectId: "group-work-9f3e5",
  storageBucket: "",
  messagingSenderId: "316520824490"
};
firebase.initializeApp(config);
var db = firebase.database();

// function Contact(first, last, email, phoneNumber, id) {
//   this.firstName = first;
//   this.lastName = last;
//   this.email = email;
//   this.phoneNumber = phoneNumber;
//   this.id = id;
// }

// Contact.prototype.fullName = function() {
//   return (
//     this.firstName +
//     "      " +
//     this.lastName +
//     "      " +
//     this.email +
//     "      " +
//     this.phoneNumber +
//     "       " +
//     this.id
//   );
// };

// $(document).ready(function() {
//   // $("#add-address").click(function() {
//   //   b;
//   //   $("#new-addresses").append(
//   //     '<div class="new-address">' +
//   //       '<div class="form-group">' +
//   //       '<label for="new-email">email</label>' +
//   //       '<input type="text" class="form-control" id="new-email">' +
//   //       "</div>" +
//   //       '<div class="form-group">' +
//   //       '<label for="new-phoneNumber">phone Number</label>' +
//   //       '<input type="text" class="form-control" id="phoneNumber">' +
//   //       "</div>" +
//   //       '<div class="form-group">' +
//   //       '<label for="new-id">ID</label>' +
//   //       '<input type="number" class="form-control" id="new-id">' +
//   //       "</div>" +
//   //       "</div>"
//   //   );
//   // });
//   $("#btn").click(function(event) {
//     alert(
//       "You are now done booking. Your book will be kept for 48 hours from now, after the time provided without comming to take the book your request will be canceled."
//     );
//     $("form#new-contact").submit(function(event) {
//       event.preventDefault();

//       var inputtedFirstName = $("input#new-first-name").val();
//       var inputtedLastName = $("input#new-last-name").val();
//       var inputtedEmail = $("input#new-email").val();
//       var inputtedPhone = $("input#new-phoneNumber").val();
//       var inputtedID = $("input#new-id").val();
//       var newContact = new Contact(
//         inputtedFirstName,
//         inputtedLastName,
//         inputtedEmail,
//         inputtedPhone,
//         inputtedID
//       );
//     });

//     var renderSingleSnapshot = function(User) {
//       var user = User.val();
//       console.log(user);
//       $("ul#contacts").append(
//         "<li><span class='contact'>" +
//           user.firstName +
//           " " +
//           user.lastName +
//           " " +
//           user.email +
//           " " +
//           user.phoneNumber +
//           " " +
//           user.id +
//           "</span></li>"
//       );
//     };

try {
  firebase
    .database()
    .ref()
    .child("User")
    .push(newContact).key;
} catch (err) {
  console.log(err);
}

//     // $("ul#contacts").append(
//     //   "<li><span class='contact'>" + newContact.fullName() + "</span></li>"
//     // );

//     $(".contact")
//       .last()
//       .click(function() {
//         $("#show-contact").show();
//         $("#show-contact h2").text(newContact.fullName());
//         console.log(newContact.firstName);
//         $(".first-name").text(newContact.firstName);
//         $(".last-name").text(newContact.lastName);
//         $("ul#addresses").text("");
//         newContact.addresses.forEach(function(address) {
//           $("ul#addresses").append(
//             "<li>" +
//               address.email +
//               ", " +
//               address.phoneNumber +
//               " " +
//               address.id +
//               "</li>"
//           );
//         });
//       });

//     // $("input#new-first-name").val("");
//     // $("input#new-last-name").val("");
//     // $("input#new-email").val("");
//     // $("input#new-phoneNumbebr").val("");
//     // $("input#new-id").val("");
//     // });
var query = firebase
  .database()
  .ref("User")
  .limitToFirst(20);
query
  .once("value")
  .then(function(snapshot) {
    snapshot.forEach(renderSingleSnapshot);
  })
  .then(function() {
    $(document)
      .find("ul#contacts")
      .html(markup);
  });

//     // var renderSingleSnapshot = function(User) {
//     //   var user = User.val();
//     //   console.log(user);
//     //   $("ul#contacts").append(
//     //     "<li><span class='contact'>" +
//     //       user.firstName +
//     //       " " +
//     //       user.lastName +
//     //       " " +
//     //       user.email +
//     //       " " +
//     //       user.phoneNumber +
//     //       " " +
//     //       user.id +
//     //       "</span></li>"
//     //   );
//     // };
//   });
//   // Address.prototype.fullAddress = function() {
//   //   return this.email + ", " + this.phoneNumber + ", " + this.id;
//   // };
//   $("ul#addresses").append(
//     "<li>" +
//       address.email +
//       ", " +
//       address.phoneNumber +
//       " " +
//       address.id +
//       "</li>"
//   );
// });
