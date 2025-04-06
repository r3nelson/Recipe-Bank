from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float, ARRAY, CheckConstraint
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)

    recipes = relationship("Recipe", back_populates="user")  # Relationship to Recipe


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    haveCooked = Column(Boolean, default=False)
    ingredients = Column(ARRAY(String), nullable=False)
    directions = Column(ARRAY(String), nullable=False)
    quantityAndType = Column(String, nullable=True)
    prepTime = Column(Integer, nullable=True)
    cookTime = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    imgURL = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Associate with a user

    user = relationship("User", back_populates="recipes")  # Relationship back to User

    __table_args__ = (
        CheckConstraint("rating >= 0 AND rating <= 5", name="rating_range"),
    )
