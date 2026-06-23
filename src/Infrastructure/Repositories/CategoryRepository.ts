import { ICategoryRepository } from "../../Application/Interfaces/ICategoryRepository";
import { Category } from "../../Domain/Entities/Category";
import { AppDbContext } from "../Data/AppDbContext";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly db: AppDbContext) {}

  async create(category: Omit<Category, "id">): Promise<Category> {
    const created = await this.db.prisma.category.create({
      data: { title: category.title },
    });
    return new Category(created.id, created.title);
  }

  async findById(id: number): Promise<Category | null> {
    const found = await this.db.prisma.category.findUnique({ where: { id } });
    if (!found) return null;
    return new Category(found.id, found.title);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.db.prisma.category.findMany({
      include: { products: true }
    });
    return categories.map((c) => new Category(c.id, c.title, c.products));
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    const updated = await this.db.prisma.category.update({
      where: { id },
      data: { title: category.title },
    });
    return new Category(updated.id, updated.title);
  }

  async delete(id: number): Promise<void> {
    await this.db.prisma.category.delete({ where: { id } });
  }
}
