module ApplicationHelper
    def belongs_to_current_user(instance)
        if current_user
            instance.user_id == current_user.id
        else 
            false
        end
    end
end
