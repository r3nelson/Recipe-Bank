from sqlalchemy import Column, Integer, String, Float, Boolean, ARRAY
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    haveCooked = Column(Boolean, default=False)
    ingredients = Column(ARRAY(String), nullable=False)
    instructions = Column(ARRAY(String), nullable=False)
    cookTime = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True) 