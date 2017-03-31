pipeline {
  agent {
    docker 'node'
  }

  stages {
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
