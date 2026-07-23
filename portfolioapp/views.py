from django.shortcuts import render, get_object_or_404

from .models import (
    Profile,
    Project,
    Skill,
    Service,
    Education,
)


def home(request):
    """
    Portfolio homepage.
    """

    profile = Profile.objects.first()
    
    featured_projects = Project.objects.all()

    skills = Skill.objects.all()

    services = Service.objects.all()

    education = Education.objects.all()

    context = {
        "profile": profile,
        "projects": featured_projects,
        "skills": skills,
        "services": services,
        "education": education,
    }

    return render(
        request,
        "portfolioapp/index.html",
        context,
    )