import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, CreateCommentDto } from './dto';
import { ArticlesRO, ArticleRO } from './article.interface';
import { CommentsRO } from './article.interface';
import { User } from '../user/user.decorator';


@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query, @User('id') userId: number ): Promise<ArticlesRO> {
    return await this.articleService.findAll(query, userId);
  }

  @Get('feed')
  async getFeed(@User('id') userId: number, @Query() query): Promise<ArticlesRO> {
    return await this.articleService.findFeed(userId, query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug): Promise<ArticleRO> {
    return await this.articleService.findOne({slug});
  }

  @Get(':slug/comments')
  async findComments(@Param('slug') slug): Promise<CommentsRO> {
    return await this.articleService.findComments(slug);
  }

  @Post()
  async create(@User('id') userId: number, @Body('article') articleData: CreateArticleDto) {
    return this.articleService.create(userId, articleData);
  }

  @Put(':slug')
  async update(@Param() params, @Body('article') articleData: CreateArticleDto) {
    return this.articleService.update(params.slug, articleData);
  }

  @Delete(':slug')
  async delete(@Param() params) {
    return this.articleService.delete(params.slug);
  }

  @Post(':slug/comments')
  async createComment(@User('id') userId: number, @Param('slug') slug, @Body('comment') commentData: CreateCommentDto) {
    return await this.articleService.addComment(userId, slug, commentData);
  }


  @Delete(':slug/comments/:id')
  async deleteComment(@Param() params) {
    const {slug, id} = params;
    return await this.articleService.deleteComment(slug, id);
  }

  @Post(':slug/favorite')
  async favorite(@User('id') userId: number, @Param('slug') slug) {
    return await this.articleService.favorite(userId, slug);
  }

  @Delete(':slug/favorite')
  async unFavorite(@User('id') userId: number, @Param('slug') slug) {
    return await this.articleService.unFavorite(userId, slug);
  }
}