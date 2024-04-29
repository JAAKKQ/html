pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps {

                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'echo "Hello"', execTimeout: 5000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: true, patternSeparator: '[, ]+', remoteDirectory: '/var/www/karkkainen.net/', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '/home/jenkins-agent/jenkins/workspace/karkkainen.net/dist/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
            }
        }
    }
}
// Tranfer files to webservers via ssh after building.