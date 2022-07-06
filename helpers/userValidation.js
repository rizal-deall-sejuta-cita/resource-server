const isValidUser = (user) => {
    let messages = []

    if (!user.username) {
        messages.push("Username required")
    }
    if (!user.email) {
        messages.push("Email required")
    }
    if (!user.firstName) {
        messages.push("First Name required")
    }
    if (!user.lastName) {
        messages.push("LastName required")
    }
    if (!user.password) {
        messages.push("Password required")
    }
    if (user.password !== undefined && user.password.length < 6) {
        messages.push("Minimal password 6 character")
    }

    if (messages.length === 0) {
        return null
    } else {
        return messages
    }
}

const trimUser = (user) => {
    if (user.username === undefined) {
        delete user.username
    }
    if (user.email === undefined) {
        delete user.email
    }
    if (user.password === undefined) {
        delete user.password
    }
    if (user.firstName === undefined) {
        delete user.firstName
    }
    if (user.lastName === undefined) {
        delete user.lastName
    }

    if (isEmpty(user)) {
        return null
    } else {
        return user
    }

}

function isEmpty(obj) {
    for(let prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

module.exports = { isValidUser, trimUser }