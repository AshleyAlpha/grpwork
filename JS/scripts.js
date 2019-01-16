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

function Contact(first, last, email, phoneNumber, id) {
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.phoneNumber = phoneNumber;
  this.id = id;
}

Contact.prototype.fullName = function() {
  return (
    this.firstName +
    " " +
    this.lastName +
    " " +
    this.email +
    " " +
    this.phoneNumber +
    " " +
    this.id
  );
};

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append(
      '<div class="new-address">' +
        '<div class="form-group">' +
        '<label for="new-email">email</label>' +
        '<input type="text" class="form-control new-email">' +
        "</div>" +
        '<div class="form-group">' +
        '<label for="new-phoneNumber">phone Number</label>' +
        '<input type="text" class="form-control phoneNumber">' +
        "</div>" +
        '<div class="form-group">' +
        '<label for="new-id">ID</label>' +
        '<input type="text" class="form-control new-id">' +
        "</div>" +
        "</div>"
    );
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedEmail = $("input.new-email").val();
    var inputtedPhone = $("input.new-phoneNumber").val();
    var inputtedID = $("input.new-id").val();
    var newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedEmail,
      inputtedPhone,
      inputtedID
    );
    try {
      firebase
        .database()
        .ref()
        .child("User")
        .push(newContact).key;
    } catch (err) {
      console.log(err);
    }

    // $("ul#contacts").append(
    //   "<li><span class='contact'>" + newContact.fullName() + "</span></li>"
    // );

    $(".contact")
      .last()
      .click(function() {
        $("#show-contact").show();
        $("#show-contact h2").text(newContact.fullName());
        console.log(newContact.firstName);
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append(
            "<li>" +
              address.email +
              ", " +
              address.phoneNumber +
              " " +
              address.id +
              "</li>"
          );
        });
      });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-email").val("");
    $("input.new-phoneNumber").val("");
    $("input.new-id").val("");
  });
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

  var renderSingleSnapshot = function(User) {
    var user = User.val();
    console.log(user);
    $("ul#contacts").append(
      "<li><span class='contact'>" +
        user.firstName +
        " " +
        user.lastName +
        " " +
        user.email +
        " " +
        user.phoneNumber +
        " " +
        user.id +
        "</span></li>"
    );
  };
});
// Address.prototype.fullAddress = function() {
//   return this.email + ", " + this.phoneNumber + ", " + this.id;
// };
$("ul#addresses").append(
  "<li>" +
    address.email +
    ", " +
    address.phoneNumber +
    " " +
    address.id +
    "</li>"
);
