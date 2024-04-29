pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
                sh 'rm -rf /var/www/karkkainen.net'
                sh 'mkdir -p /var/www/karkkainen.net'
                sh 'cp -r dist/* /var/www/karkkainen.net'
            }
        }
        stage('Deploy'){
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'rm -rf /var/www/karkkainen.net', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sshPublisher(publishers: [sshPublisherDesc(configName: 'HEL-WWW-DEV-01', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/var/www/karkkainen.net', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '/home/jenkins-agent/jenkins/workspace/karkkainen.net/dist/')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
// Tranfer files to webservers via ssh after building.