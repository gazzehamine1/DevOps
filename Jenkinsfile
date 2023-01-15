pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/gazzehamine1/DevOps', branch: 'main'
            }
        }
      stage('Init') {
            steps {
                withCredentials([string(credentialsId: DOCKERHUB_CREDENTIALS, variable: 'dh_cred')]) {
                    sh "echo ${env.dh_cred} | docker login --username _json_key --password-stdin https://gcr.io"
                }
            }
        }
        
        stage('Test') {
            steps {
                sh 'cd EmployeeManagementApp && npm run test'
                sh 'cd GestionProduit-V && mvn test'
            }
        }
        stage('Build') {
            steps {
                sh 'cd EmployeeManagementApp && docker build -t frontend:latest .'
                sh 'cd GestionProduit-V && docker build -t backend:latest .'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker push gazzehamine/frontend:latest'
                sh 'docker push gazzehamine/backend:latest'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
                sh 'docker logout'
            }
        }
    }

}
