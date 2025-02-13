from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Mock data for reviews
reviews = [
    {"name": "John Doe", "review": "Smart Pantry has completely changed the way I manage my kitchen. It's so easy to keep track of everything now!"},
    {"name": "Jane Smith", "review": "I love the recipe suggestions! They help me make the most of what I have in my pantry."}
]

# Mock data for recipes
recipes = [
    {"name": "Spaghetti Bolognese", "ingredients": "Spaghetti, Ground Beef, Tomato Sauce"},
    {"name": "Chicken Salad", "ingredients": "Chicken, Lettuce, Tomatoes, Cucumber"}
]

@app.route('/')
def home():
    return render_template('frontend.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/recipes', methods=['GET', 'POST'])
def recipes_page():
    if request.method == 'POST':
        # Handle form submission
        name = request.form['name']
        ingredients = request.form['ingredients']
        recipes.append({"name": name, "ingredients": ingredients})
        return redirect(url_for('recipes_page'))
    return render_template('recipes.html', recipes=recipes)

@app.route('/notifications')
def notifications():
    return render_template('notifications.html')

js file everzthing in the folder@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Handle form submission
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # Process the form data (e.g., save to database, send email, etc.)
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/review', methods=['GET', 'POST'])
def review():
    if request.method == 'POST':
        # Handle form submission
        name = request.form['name']
        review_text = request.form['review']
        reviews.append({"name": name, "review": review_text})
        return redirect(url_for('review'))
    return render_template('review.html', reviews=reviews)

if __name__ == '__main__':
    app.run(debug=True)
