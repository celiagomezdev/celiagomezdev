import React, { Fragment } from 'react'

export default function TextContent(position) {
  return [
    {
      title: 'About me',
      description: (
        <Fragment>
          <p>
            I’m a Full Stack Software Engineer living in Berlin since 2013.
            Three years ago, with more than 10 years of experience as a
            marketing specialist, I decided to switch careers and become a
            Software Engineer. <br />
            <br />
            What an{' '}
            <a
              href="https://www.youtube.com/watch?v=UMqg37sPwAA"
              target="_blank"
              rel="noreferrer"
            >
              exciting and challenging journey!{' '}
            </a>
            <br />
            <br />
            In 2018 I got a job opportunity at{' '}
            <a href="https://unumotors.com" target="_blank" rel="noreferrer">
              unumotors
            </a>
            , and during those incredible two years I've been learning from that
            amazing team and enjoying creating useful applications, developing
            features and solving problems. <br />
            <br />
            Right now I'm open to new opportunities!
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Projects',
      description: (
        <Fragment>
          <p>
            In my first two years as a Software Engineer I've been involved in
            Backend, Frontend and Mobile projects:
          </p>
          <ul>
            <li>
              UI redesign of{' '}
              <a href="https://unumotors.com" target="_blank" rel="noreferrer">
                unumotors
              </a>{' '}
              (built with Vue.js)
            </li>
            <li>Mobile app for the scooter users (Cordova for iOS/Android)</li>
            <li>unu app backend, build with Node.js</li>
            <li>Personal portfolio using Gatsby and React 16.8</li>
          </ul>
          <p>
            I’ve been also organiser and teacher assistant of the{' '}
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
            >
              {' '}
              <br />
              <br />
              Here
            </a>{' '}
            you can watch the talk I gave in the graduation ceremony (sorry it
            was my first one!).
          </p>
        </Fragment>
      ),
    },
    {
      title: 'Skill set',
      description: (
        <Fragment>
          <p>I've worked with the following technologies and tools:</p>
          <ul>
            <li>
              JavaScript, React.js, Jest, React Testing Library, Hooks, Styled
              Components (Emotion), Vue.js, Vuex, Vue Router, CSS (SCSS), Pug,
              Webpack, MVVM, State Management.
            </li>
            <li>
              Node.js, npm, Express.js, Axios, GraphQL, Apollo, Cordova, Docker,
              Kubernetes, Tilt, Ava, Terraform, Slack API.
            </li>
            <li>
              Git, GitLab, Sourcetree, Visual Studio Code, Slack, Zeplin, Figma,
              Agile (Scrum), Confluence, Jira, Asana.
            </li>
          </ul>
          <br />
          <p>
            In addition, I count with other habilities coming from my previous
            10 years of experience in the field of Marketing and Advertising,
            like communication and organizational skills, care for visual
            aesthetics, attention-to-detail, customer orientation, empathy.
          </p>
        </Fragment>
      ),
    },
  ][position]
}
