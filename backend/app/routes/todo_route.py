from flask import Blueprint, jsonify, request
from app.models.todo import Todo
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

todo_bp = Blueprint('todo', __name__)

@todo_bp.route('/get-todos', methods=['GET'])
@jwt_required()
def get_todos():
    user_id = get_jwt_identity()
    print(user_id)

    todos = Todo.get_todos(user_id)

    todo_list = [{"todo_id": todo["todo_id"], "task": todo["task"], "completed": todo["completed"], "created_at": todo["created_at"]} for todo in todos]
    return jsonify({"todo_list": todo_list}), 200

@todo_bp.route('/add-todo', methods=['POST'])
@jwt_required()
def create_todo():
    user_id = get_jwt_identity()
    

    
    data = request.get_json()
    print(data)

    newtodo = data.get("newtodo")
    task = newtodo.get("task")
    todo_id = newtodo.get("todo_id")
    created_at = datetime.now()

    if not task:
        return jsonify({"message": "Task is required"}), 400

    Todo.create_todo(task, user_id, todo_id, created_at)

    return jsonify({"message": "Todo created successfully"}), 201

@todo_bp.route('/todos/<todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    user_id = get_jwt_identity()

    data = request.get_json()

    task = data.get("task")

    if not task:
        return jsonify({"message": "Task is required"}), 400

    Todo.update_todo(task, todo_id)

    return jsonify({"message": "Todo updated successfully"}), 200


@todo_bp.route('/todos/<todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    user_id = jwt_required()

    results  = Todo.delete_todo(todo_id)
    if results.deleted_count > 0:
        return jsonify({"message": "Todo deleted successfully"}), 200
    else:
        return jsonify({"message": "Todo not found"}), 404
    

@todo_bp.route("/comleted/<todo_id>", methods=["POST"])
@jwt_required()
def mark_as_completed(todo_id):
    data = request.get_json()
    isCompleted = data.get("isCompleted")
    
    Todo.mark_as_completed( todo_id, isCompleted)

    return jsonify({"message": "Todo marked as completed"}), 200
