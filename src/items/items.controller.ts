import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  // ItemsServiceクラスをインスタンス化し、変数に代入
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findAById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ) {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    };
    return this.itemsService.create(item);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.itemsService.delete(id);
  }
}
