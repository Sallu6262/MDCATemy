variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "ap-south-1"
}

variable "ami_id" {
  description = "Amazon Linux AMI ID for the selected AWS region"
  type        = string
  default     = "ami-02eb0c2388ee999f9"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_pair_name" {
  description = "Name of the AWS key pair used for SSH"
  type        = string
  default     = "quizbuilder-key"
}

variable "ssh_allowed_ip" {
  description = "IP address allowed for SSH access. Replace with your IP in CIDR format."
  type        = string
  default     = "0.0.0.0/0"
}