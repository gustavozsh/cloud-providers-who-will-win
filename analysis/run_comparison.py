"""
Main comparison runner for cloud providers analysis.
Executes all comparison modules and generates consolidated results.
"""
import json
from datetime import datetime
from pathlib import Path

# Import analysis modules using relative imports
from financial.analyzer import FinancialAnalyzer
from performance.analyzer import PerformanceAnalyzer
from scalability.analyzer import ScalabilityAnalyzer
from ease_of_use.analyzer import EaseOfUseAnalyzer
from logger_config import setup_logger

# Set up logger
logger = setup_logger(__name__)


def calculate_overall_score(results):
    """Calculate weighted overall score for each provider."""
    weights = {
        'financial': 0.30,
        'performance': 0.25,
        'scalability': 0.25,
        'ease_of_use': 0.20
    }
    
    scores = {
        'gcp': 0,
        'aws': 0
    }
    
    for category, weight in weights.items():
        if category in results:
            scores['gcp'] += results[category]['gcp']['score'] * weight
            scores['aws'] += results[category]['aws']['score'] * weight
    
    return scores


def main():
    logger.info("=" * 60)
    logger.info("Cloud Providers Comparison Analysis")
    logger.info("GCP vs AWS")
    logger.info("=" * 60)
    
    # Run all analyses
    results = {}
    
    logger.info("Running Financial Analysis...")
    financial = FinancialAnalyzer()
    results['financial'] = financial.analyze()
    logger.info(f"  GCP Score: {results['financial']['gcp']['score']:.2f}/100")
    logger.info(f"  AWS Score: {results['financial']['aws']['score']:.2f}/100")
    
    logger.info("Running Performance Analysis...")
    performance = PerformanceAnalyzer()
    results['performance'] = performance.analyze()
    logger.info(f"  GCP Score: {results['performance']['gcp']['score']:.2f}/100")
    logger.info(f"  AWS Score: {results['performance']['aws']['score']:.2f}/100")
    
    logger.info("Running Scalability Analysis...")
    scalability = ScalabilityAnalyzer()
    results['scalability'] = scalability.analyze()
    logger.info(f"  GCP Score: {results['scalability']['gcp']['score']:.2f}/100")
    logger.info(f"  AWS Score: {results['scalability']['aws']['score']:.2f}/100")
    
    logger.info("Running Ease of Use Analysis...")
    ease_of_use = EaseOfUseAnalyzer()
    results['ease_of_use'] = ease_of_use.analyze()
    logger.info(f"  GCP Score: {results['ease_of_use']['gcp']['score']:.2f}/100")
    logger.info(f"  AWS Score: {results['ease_of_use']['aws']['score']:.2f}/100")
    
    # Calculate overall scores
    overall_scores = calculate_overall_score(results)
    results['overall'] = overall_scores
    
    logger.info("=" * 60)
    logger.info("OVERALL RESULTS")
    logger.info("=" * 60)
    logger.info(f"GCP Overall Score: {overall_scores['gcp']:.2f}/100")
    logger.info(f"AWS Overall Score: {overall_scores['aws']:.2f}/100")
    
    winner = 'GCP' if overall_scores['gcp'] > overall_scores['aws'] else 'AWS'
    logger.info(f"🏆 Winner: {winner}")
    
    # Save results
    results['metadata'] = {
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    }
    
    output_file = Path(__file__).parent / 'comparison_results.json'
    try:
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        logger.info(f"Results saved to: {output_file}")
    except IOError as e:
        logger.error(f"Failed to save results to {output_file}: {e}")
        raise
    
    return results


if __name__ == '__main__':
    main()
