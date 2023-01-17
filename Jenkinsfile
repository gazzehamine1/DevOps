pipeline {
    agent any
      environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/gazzehamine1/DevOps', branch: 'main'
            }
        }
        stage('Init'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        
      
        stage('Build') {
            steps {
                sh 'cd EmployeeManagementApp && docker build -t gazzehamine/frontend:latest .'
                sh 'cd GestionProduit-V && docker build -t gazzehamine/backend:latest .'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker push gazzehamine/frontend:latest'
                sh 'docker push gazzehamine/backend:latest'
            }
        }
          stage('Deploy to Kubernetes') {
            steps {
               script {
                   kubernetesDeploy(configs: "deploymentservice.yaml", kubeconfigId:"kubernetes")
               
            }
            }
        }
    }

}
