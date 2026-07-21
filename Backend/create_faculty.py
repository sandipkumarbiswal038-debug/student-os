from accounts.models import User
from rest_framework.authtoken.models import Token

# Create user step by step
faculty_user = User(username='professor')
faculty_user.set_password('faculty123')
faculty_user.name = 'Professor Smith'
faculty_user.roll_number = 'FAC001'
faculty_user.role = 'FACULTY'
faculty_user.college_email = 'professor@niis.ac.in'
faculty_user.batch = 'MCA-2026'
faculty_user.save()

# Generate Token
faculty_token, created = Token.objects.get_or_create(user=faculty_user)

print("✅ SUCCESS! Your NEW Faculty Token is:")
print(faculty_token.key)