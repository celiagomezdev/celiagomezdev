import React, { Fragment } from "react"

export default function TextContent(position) {
  return [
    {
      title: "About me",
      description: (
        <Fragment>
          <p>
          I’m a Full Stack Software Engineer living in Berlin since 2013. Three
          years ago, with more than 10 years of experience as a marketing specialist, I
          decided to switch careers and become a Software Engineer. <br /><br />
          What an{" "}
          <a
            href="https://www.youtube.com/watch?v=UMqg37sPwAA"
            target="_blank"
            rel="noreferrer"
          >
            exciting and challenging journey!{" "}
          </a>
          <br /><br />
          In 2018 I got a job opportunity at{" "}
          <a href="https://unumotors.com" target="_blank" rel="noreferrer">
            unumotors
          </a>
          , and since then I’ve been learning from that amazing team and
          enjoying creating useful applications, developing features and solving
          problems. <br /><br />
          Right now I'm open to new opportunities! 
          </p>
        </Fragment>
      ),
    },
    {
      title: "Projects",
      description: (
        <Fragment>
          <p>
            In my first two years as developer I've been involved in backend,
            frontend and mobile projects:
          </p>
          <ul>
            <li>
              UI redesign of{" "}
              <a href="https://unumotors.com" target="_blank" rel="noreferrer">
                unumotors
              </a>{" "}
              (built with Vue.js)
            </li>
            <li>mobile app for the scooter users (Cordova for iOS/Android)</li>
            <li>unu app backend, build with Node.js</li>
            <li>personal portfolio using Gatsby and React 16.8</li>
          </ul>
          <p> 
            I’ve been also organiser and teacher assistant of the{" "}
            <a
              href="http://wtmberlin.com/javascript-crash-course/"
              target="_blank"
              rel="noreferrer"
            >
              JavaScript Crash Course
            </a>
            , the bootcamp for women where I started this incredible journey. 
            <a
              href="https://www.youtube.com/watch?v=UMqg37sPwAA&t"
              target="_blank"
              rel="noreferrer"
            > <br /><br />
              Here
            </a> you can watch the talk I gave in the graduation ceremony (sorry it was my first one!).
          </p>
        </Fragment>
      ),
    },
    {
      title: "Skill set",
      description: (
        <Fragment>
          <p>I have knowledge of the following technologies and tools:</p>
          <ul>
            <li>React.js, Vue.js, Vuex, Nuxt, CSS (SCSS), Pug, Webpack.</li>
            <li>
              Cordova, vanilla JavaScript, npm, Jest (unit tests), MVVM
              architecture, state management.
            </li>
            <li>
              Node.js, Express.js, Docker, Kubernettes, Tilt, Ava (unit tests),
              Terraform, Slack API.
            </li>
            <li>
              Git, GitLab, Sourcetree, Visual Studio Code, Slack,
              Zeplin, Figma, Agile methodologies (Scrum), Confluence, Jira, Asana.
            </li>
          </ul>
          <p>In addition, I count with other habilities coming from my previous 10 years of experience
            in the advertising field, like communication and organizational skills, care for visual aesthetics, 
            attention-to-detail, customer orientation, empathy. 
          </p>
        </Fragment>
      ),
    },
  ][position]
}
