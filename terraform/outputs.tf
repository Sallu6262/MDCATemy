output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.quizbuilder_server.public_ip
}

output "frontend_url" {
  description = "Frontend application URL"
  value       = "http://${aws_instance.quizbuilder_server.public_ip}:8080"
}

output "backend_url" {
  description = "Backend application URL"
  value       = "http://${aws_instance.quizbuilder_server.public_ip}:3000"
}