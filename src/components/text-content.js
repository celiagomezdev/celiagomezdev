import React, { Fragment } from "react"

export default function TextContent(position) {
  return [
    {
      title: "About me",
      description: <Fragment>I’m a full stack software engineer living in Berlin since 2013. Three years ago, with 7 years of experience as a marketing specialist, I decided to switch careers and become a Software Engineer. <br/>What an <a href="https://www.youtube.com/watch?v=UMqg37sPwAA" target="_blank" rel="noreferrer">exciting and challenging journey! </a><br/>In 2018, I got a job opportunity at <a href="https://unumotors.com" target="_blank" rel="noreferrer">unumotors</a>, and since then I’ve been learning from that amazing team and enjoying creating useful applications, developing features and solving problems. <br/>Right now I'm open to new opportunities!
      Slide right to know more.</Fragment>
    },
    {
      title: "Projects",
      description: <Fragment><p>In my first two years as developer I've been involved in backend, frontend and mobile projects, like for example:</p>
      <ul>
        <li>UI redesign of <a href="https://unumotors.com" target="_blank" rel="noreferrer">unumotors</a> (built with Vue.js)</li>
        <li>mobile app for the scooter users (cordova for iOS/Android)</li>
        <li>unu app backend, build with Node.js.</li>
      </ul>
      <p>I’ve been also organiser and teacher assistant of the <a href="http://wtmberlin.com/javascript-crash-course/" target="_blank" rel="noreferrer">JavaScript Crash Course</a>, the bootcamp for women where I started this incredible journey.
      </p>
      </Fragment>
    },
    {
      title: "Skill set",
      description: <Fragment>
      <p>I have knowledge of the following technologies and tools:</p>
      <ul>
        <li>React.js, Vue.js, Vuex, Nuxt, CSS (SCSS), Pug, Webpack.</li>
        <li>Cordova, vanilla JavaScript, npm, Jest (unit tests), MVVM architecture, state management.</li>
        <li>Node.js, Express.js, Docker, Kubernettes, Tilt, Ava (unit tests), Terraform, Slack API.</li>
        <li>Git, GitLab, Sourcetree, Visual Studio Code, Slack, Confluence, Zeplin, Figma, Jira, Asana.</li>
      </ul>
      </Fragment>
    }
  ][position]
}
