# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([{name: "Alice", password: "alice", baby_name: "Ava", baby_dob: 20181111}])
User.create([{name: "Bob", password: "bob", baby_name: "Becky", baby_dob: 20191212}])

Activity.create({name: "Sing along to music" ,description: "Try picking a favourite album you like to hear",minimum_age: "0-6 months",minimum_time_taken: "Less than 10 minutes",upvotes: 1,downvotes: 4, user_id: 1})
Activity.create({ name: "Peekaboo", description: "Hiding your face and then showing it again",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 minutes",upvotes: 10,downvotes: 4, user_id:1 })
