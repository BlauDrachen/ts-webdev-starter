import * as OfflinePluginRuntime from "offline-plugin/runtime";
import {getUsers} from "./api/exampleApi";
import "./scss/index.scss";

// Setup Offline Plugin
OfflinePluginRuntime.install();

// Populate table of users via API call.
getUsers().then((result) => {
  let usersBody = "";

  result.forEach((user) => {
    // tslint:disable:semicolon
    usersBody += `<tr>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
    // tslint:enable:semicolon
  });

  // @ts-ignore
  global.document.getElementById("users").innerHTML = usersBody;
});
