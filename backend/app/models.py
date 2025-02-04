from sqlalchemy import Column, Integer, String, Float, Boolean, ARRAY, CheckConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    haveCooked = Column(Boolean, default=False)
    ingredients = Column(JSONB, nullable=False) 
    directions = Column(ARRAY(String), nullable=False)
    quantity = Column(Float, nullable=True)
    prepTime = Column(Integer, nullable=True)
    cookTime = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True) 

    __table_args__ = (
        CheckConstraint("rating >= 0 AND rating <= 5", name="rating_range"),
    )