SELECT topics.id,
       topics.title,
       topics.creation_date,
       topics.active,
       topics.city,
       topics.country,
       topics.owner_id AS topic_user_id,
       topic_users.username AS topic_username,
       topic_users.img_url AS topic_user_img_url,
       comment_users.username AS comment_username,
       comments.user_id AS comment_user_id,
       comments.comment
FROM topics
JOIN users topic_users ON topics.owner_id=topic_users.id
JOIN comments ON comments.topic_id=topics.id
JOIN users comment_users ON comment_users.id = comments.user_id 
ORDER BY comments.id DESC 
LIMIT 3