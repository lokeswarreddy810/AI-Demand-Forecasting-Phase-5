from app.models.model_performance import ModelPerformance


def create_model_performance(db, user_id, performance_data):
    performance = ModelPerformance(
        model_name=performance_data.model_name,
        project_id=performance_data.project_id,
        user_id=user_id,
        mae=performance_data.mae,
        rmse=performance_data.rmse,
        accuracy=performance_data.accuracy,
        improvement_rate=performance_data.improvement_rate
    )

    db.add(performance)
    db.commit()
    db.refresh(performance)

    return performance


def get_accuracy_dashboard(db, project_id):
    data = db.query(ModelPerformance).filter(
        ModelPerformance.project_id == project_id
    ).all()

    if not data:
        return {
            "average_mae": 0,
            "average_rmse": 0,
            "average_accuracy": 0,
            "average_improvement_rate": 0
        }

    avg_mae = sum(item.mae or 0 for item in data) / len(data)
    avg_rmse = sum(item.rmse or 0 for item in data) / len(data)
    avg_accuracy = sum(item.accuracy or 0 for item in data) / len(data)
    avg_improvement = sum(item.improvement_rate or 0 for item in data) / len(data)

    return {
        "average_mae": round(avg_mae, 2),
        "average_rmse": round(avg_rmse, 2),
        "average_accuracy": round(avg_accuracy, 2),
        "average_improvement_rate": round(avg_improvement, 2)
    }


def get_accuracy_trends(db, project_id):
    data = db.query(ModelPerformance).filter(
        ModelPerformance.project_id == project_id
    ).order_by(
        ModelPerformance.created_at
    ).all()

    return [
        {
            "id": item.id,
            "model_name": item.model_name,
            "accuracy": item.accuracy,
            "created_at": str(item.created_at) if item.created_at else None
        }
        for item in data
    ]


def get_model_history(db, project_id):
    data = db.query(ModelPerformance).filter(
        ModelPerformance.project_id == project_id
    ).order_by(
        ModelPerformance.created_at.desc()
    ).all()

    return [
        {
            "id": item.id,
            "model_name": item.model_name,
            "mae": item.mae,
            "rmse": item.rmse,
            "accuracy": item.accuracy,
            "improvement_rate": item.improvement_rate,
            "created_at": str(item.created_at) if item.created_at else None
        }
        for item in data
    ]


def generate_accuracy_report(db, project_id):
    data = db.query(ModelPerformance).filter(
        ModelPerformance.project_id == project_id
    ).all()

    if not data:
        return {
            "project_id": project_id,
            "models_evaluated": 0,
            "average_accuracy": 0,
            "best_model": "N/A",
            "lowest_mae_model": "N/A"
        }

    best_model = max(data, key=lambda item: item.accuracy or 0)
    lowest_mae_model = min(data, key=lambda item: item.mae or 0)

    return {
        "project_id": project_id,
        "models_evaluated": len(data),
        "average_accuracy": round(
            sum(item.accuracy or 0 for item in data) / len(data),
            2
        ),
        "best_model": best_model.model_name,
        "lowest_mae_model": lowest_mae_model.model_name
    }