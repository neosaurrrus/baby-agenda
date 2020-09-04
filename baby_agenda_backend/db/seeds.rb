# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([{name: "Alice", password: "alice", baby_name: "Ava", baby_dob: 20181111}])
User.create!([{name: "Bob", password: "bob", baby_name: "Becky", baby_dob: 20191212}])

Activity.create!({name: "Sing along to music" ,description: "Try picking a favourite album you like to hear",minimum_age: "0-6 months",minimum_time_taken: "Less than 10 minutes",upvotes: 1,downvotes: 4, user_id: 1})
Activity.create!({ name: "Peekaboo", description: "Hiding your face and then showing it again",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 minutes",upvotes: 10,downvotes: 4, user_id:1 })
Activity.create!({ name: "Dance Around!", description: "Encourage or hold your baby as you dance to your favourite tunes",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 minutes",upvotes: 2,downvotes: 2, user_id:2 })
Activity.create!({ name: "Show family photographs", description: "Introduce your baby to your family via photo albums",minimum_age: "6-12 months",minimum_time_taken: "10-30 minutes",upvotes: 20,downvotes: 5, user_id:2 })
Activity.create!({ name: "Look out of the Window", description: "The window is fascinating for a baby. Try counting, pointing and calling out names",minimum_age: "6-12 months",minimum_time_taken: "10-30 minutes",upvotes: 7,downvotes: 3, user_id:2 })
Activity.create!({ name: "Read a story out loud", description: "This does not have to be from a book or a great tale, try using sock puppets to tell the story of your last shopping trip! ",minimum_age: "6-12 months",minimum_time_taken: "10-30 minutes",upvotes: 6,downvotes: 3, user_id:2 })
Activity.create!({ name: "Ready Steady Go!", description: "Hold a ball or aother object in the air and shout Ready Steady Go and drop it. Babies love the suspense!",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 Minutes",upvotes: 10,downvotes: 9, user_id:2 })
Activity.create!({ name: "Blowing Bubbles", description: "A bubble mixture can be made from Washing up liquid. Babies love popping bubbles",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 minutes",upvotes: 10,downvotes: 9, user_id:2 })
Activity.create!({ name: "Rhythm Play", description: "A wooden spoon and saucepan makes a great drum kit!",minimum_age: "6-12 months",minimum_time_taken: "Less than 10 minutes",upvotes: 16,downvotes: 10, user_id:1 })

Item.create!({user_id:1, activity_id:2})