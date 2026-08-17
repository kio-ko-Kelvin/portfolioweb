from django.db import models
from django.utils.text import slugify


class Profile(models.Model):
    name = models.CharField(max_length=100)
    profession = models.CharField(max_length=150)
    short_intro = models.CharField(max_length=250)

    bio = models.TextField()

    icon_image = models.ImageField(upload_to="icon/", null=True, blank=True)
    hero_image = models.ImageField(upload_to="profile/")
    profile_image = models.ImageField(upload_to="profile/")

    cv = models.FileField(upload_to="cv/", blank=True, null=True)

    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    location = models.CharField(max_length=100)

    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    title = models.CharField(max_length=100)

    description = models.TextField()

    def __str__(self):
        return self.title
    

class Project(models.Model):
    title = models.CharField(max_length=200)

    description = models.TextField()

    image = models.ImageField(upload_to="projects/")

    github_url = models.URLField(blank=True, null=True)

    live_demo = models.URLField(blank=True, null=True)

    technologies = models.CharField(max_length=150, default="unlisted")

    created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title
    