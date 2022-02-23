CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
     prenom TEXT,
     username TEXT ,
     email TEXT ,
     password TEXT,
     telephone NUMBER ,
     role NUMBER 

); 

INSERT or IGNORE INTO user(id, name,prenom , username , email , password , telephone , role) VALUES (1, 'Justin', 'Yummy' , 'agent01' ,'agent@gmail.com','999kjki' , '0655581600' , '0');
INSERT or IGNORE INTO user(id, name,prenom , username , email , password , telephone , role) VALUES (1, 'jam', 'Yummy' , 'agent02' ,'agent2@gmail.com','999kjki' , '0659981600' , '1');

