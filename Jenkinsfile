pipeline {
  agent {
    docker 'node'
  }

  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Analysis') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
