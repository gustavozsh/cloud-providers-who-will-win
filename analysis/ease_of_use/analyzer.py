"""
Ease of Use Analysis Module
Compares learning curve and deployment ease of GCP vs AWS.
"""


class EaseOfUseAnalyzer:
    def __init__(self):
        self.criteria = [
            'documentation',
            'console_usability',
            'learning_curve',
            'deployment_tools',
            'community_support'
        ]
    
    def analyze(self):
        """
        Perform ease of use analysis comparing GCP and AWS.
        Returns detailed scores and reasoning.
        """
        # Sample data - based on developer experience surveys
        gcp_metrics = {
            'documentation': 88,  # Clear, well-organized docs
            'console_usability': 90,  # Clean, intuitive UI
            'learning_curve': 85,  # Easier to get started
            'deployment_tools': 87,  # Cloud Build, Cloud Deploy
            'community_support': 75  # Smaller but growing community
        }
        
        aws_metrics = {
            'documentation': 82,  # Comprehensive but can be overwhelming
            'console_usability': 75,  # More complex UI
            'learning_curve': 70,  # Steeper learning curve
            'deployment_tools': 85,  # CodePipeline, CodeDeploy
            'community_support': 95  # Largest community and resources
        }
        
        gcp_score = sum(gcp_metrics.values()) / len(gcp_metrics)
        aws_score = sum(aws_metrics.values()) / len(aws_metrics)
        
        return {
            'gcp': {
                'score': gcp_score,
                'metrics': gcp_metrics,
                'strengths': [
                    'More intuitive console interface',
                    'Clearer documentation structure',
                    'Easier to get started for beginners',
                    'Simpler service naming'
                ],
                'weaknesses': [
                    'Smaller community and fewer resources',
                    'Less third-party tooling',
                    'Fewer training materials'
                ]
            },
            'aws': {
                'score': aws_score,
                'metrics': aws_metrics,
                'strengths': [
                    'Massive community and ecosystem',
                    'Extensive training and certification',
                    'More third-party integrations',
                    'Abundant learning resources'
                ],
                'weaknesses': [
                    'Steeper learning curve',
                    'More complex console',
                    'Service naming can be confusing',
                    'Documentation can be overwhelming'
                ]
            },
            'category': 'ease_of_use',
            'description': 'Analysis of learning curve and deployment ease'
        }
