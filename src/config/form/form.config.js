const forms = {
  login: {
    username: {
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      secure: false,
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
  },
  newBlog: {
    title: {
      type: "text",
      label: "Title",
      placeholder: "Enter title",
      secure: false,
    },
    short: {
      type: "text",
      label: "Short description",
      placeholder: "Enter short",
      secure: false,
    },
    content: {
      type: "textarea",
      label: "content",
      placeholder: "Enter HTML",
      secure: false,
    },
  },
};

export default forms;
